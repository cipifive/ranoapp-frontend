import { FC, useEffect, useRef, useState } from "react"
import menu_sound from '../../assets/change_menu.mp3'
import { IoSettings } from "react-icons/io5"
import { useNavigate, useParams } from "react-router-dom"
import { NavigationBar } from "../../components/Game/NavigationBar"
import { Board } from "../../components/Board/Board"
import { General } from "../../components/Game/General/General"
import { handleClickHomeButton, playSound } from "../../utils/helperFunctions"
import { useSoundStore } from "../../Zustand/soundStore"
import { ISound } from "../../models/settings"
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useTransitionStore } from "../../Zustand/transitionStore"
import clic_sound from '../../assets/button_clic.wav'
import { getGameByID } from "../../services/game_service"
import { error } from "../../utils/toast"

export const Game:FC<any> = ():JSX.Element => {

    const [selectedMenu, setSelectedMenu] = useState<number>(1)
    const [prevSelectedMenu, setPrevSelectedMenu] = useState<number>(0)

    const { setReduce }:any = useTransitionStore()

    const navigate:any = useNavigate()
    
    const [startX, setStartX] = useState<any>(null)

    const { sounds }:ISound = useSoundStore()

    const [data, setData] = useState<any>()


    const {id}:any = useParams()

    const [turn, setTurn] = useState<any>()

    const [round, setRound] = useState<any>()

    const [nextPlayer, setNextPlayer] = useState<boolean>(false)

    const audioRefMenu:any = useRef()
    const audioRef:any = useRef()

    const handleTouchStart = (e:any) => {
        setStartX(e.touches[0].clientX);
    }

    const handleTouchEnd = (e:any) => {
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = startX - endX;

        const minDistance = 100; // Define la distancia mínima para considerar el deslizamiento como válido

    if (Math.abs(deltaX) > minDistance) {
        if (deltaX < 0) {
            // Deslizamiento hacia la izquierda
            if (selectedMenu > 1) {
                setSelectedMenu(selectedMenu - 1);
                setPrevSelectedMenu(selectedMenu)

            }
        } else {
            // Deslizamiento hacia la derecha
            if (selectedMenu < 4) {
                setSelectedMenu(selectedMenu + 1);
                setPrevSelectedMenu(selectedMenu)
            }
        }
    }
    }

    const renderGame = () => {
        switch(selectedMenu) {
            case 1:
                return (<General
                    turn={turn}
                    round={round}
                    selectedMenu={selectedMenu}
                    prevSelectedMenu={prevSelectedMenu}
                    gameData={data} 
                    nextPlayer={nextPlayer}
                    />)
        case 2:
            return (
                <Board
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                prevSelectedMenu={prevSelectedMenu}
                turn={turn}
                ronda={round}
                gameData={data}  
                setNextPlayer={setNextPlayer} />
            )
        }
    }

    const fetchGameByID = async () => {
        try {
            const res = await getGameByID(id)
            if(res.status === 200) {
                setRound(res.data.data.round)
                const roundHistory = res.data.data.history.filter((item:any) => item.id_round === res.data.data.round);

                // Obtener el ID del último jugador que realizó un movimiento en la ronda actual
                const lastPlayerId = roundHistory.length > 0 ? roundHistory[roundHistory.length - 1].id_user : null;

                // Encontrar el índice del último jugador en el arreglo de jugadores
                const lastPlayerIndex = res.data.data.players.findIndex((player:any) => player.id === lastPlayerId);

                // Calcular el índice del siguiente jugador
                const nextPlayerIndex = (lastPlayerIndex + 1) % res.data.data.players.length;

                // Obtener el siguiente jugador
                const nextPlayer = res.data.data.players[nextPlayerIndex];

                setTurn(nextPlayer)
                setData(res.data.data)
            }
        } catch (err:any) {
            error("Partida no encontrada")
            navigate("/")
        }
    }

    useEffect(() => {
        fetchGameByID()
    }, [nextPlayer])

    useEffect(() => {
        playSound(audioRefMenu)
    }, [selectedMenu])


    return (
        <div className="flex justify-start items-center flex-col w-full p-4  h-full screen_component_aument">
            <span  onClick={() => handleClickHomeButton("/", audioRef,setReduce,navigate)} ><FaLongArrowAltLeft className="absolute top-3 left-3 z-10" size={34} color="orange" /></span>
            <div className="absolute top-2 right-2">
                <IoSettings className="border p-1 rounded-full border-white bg-amber-400  " size={35} />
            </div>
            <span className="text-amber-400 font-game2 text-2xl h-20">
                {
                selectedMenu === 1?
                    'Información General'
                    :
                    'Tablero'
                }
            </span>
            {
                ! (turn || round)?
                false
                :
                <div className="h-full w-full mb-16" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    {renderGame()}
                  
                </div>
                
            }
            {
              
            }
            <NavigationBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            
            
            
            <audio ref={audioRef} muted={!sounds} src={clic_sound} />
            <audio ref={audioRefMenu} muted={!sounds} src={menu_sound} />
        </div>
    )
       
}