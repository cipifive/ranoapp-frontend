import { FC, useEffect, useRef, useState } from "react"
import { handleClickHomeButton } from "../../utils/helperFunctions"
import { FaLongArrowAltLeft } from "react-icons/fa"
import clic_sound from '../../assets/button_clic.wav'
import { useTransitionStore } from "../../Zustand/transitionStore"
import { useSoundStore } from "../../Zustand/soundStore"
import { ISound } from "../../models/settings"
import { useNavigate } from "react-router-dom"
import { getGameByID, getStartedGames } from "../../services/game_service"
import { IUser } from "../../models/users"

export const ContinueGame:FC<any> = (props):JSX.Element => {

    const { setReduce }:any = useTransitionStore()

    const { sounds }:ISound = useSoundStore()

    const navigate:any = useNavigate()

    const audioRef:any = useRef()

    const [games, setGames] = useState<any>([])

    const [selectedGame, setSelectedGame] = useState<any | undefined>()

    const [gameInfo, setGameInfo] = useState<any | undefined>()

    const handleSelectGame = async(e:any) => {
        try {
            const name = e.target.value
            setSelectedGame(games.find((game:any) => game.name === name))
            const response = await getGameByID(games.find((game:any) => game.name === name)?.id)
            if(response.status === 200) {
                console.log(response.data.data)
                setGameInfo(response.data.data)
            }
        } catch (err:any) {
            
        }
        
    }

    const fetchStartedGames = async () => {
        try {
            const response = await getStartedGames()
            if(response.status === 200) {
                setGames(response.data.data)
            }
        } catch (err:any) {
            
        }
    }

    const handleContinueGame = () => {
        navigate(`/game/${selectedGame.id}`)
    }

    useEffect(() => {
        fetchStartedGames()
    }, [])
    

    return (
        <div className="flex justify-start items-center flex-col w-full p-4 h-full   screen_component_aument relative">
            <span  onClick={() => handleClickHomeButton("/", audioRef,setReduce,navigate)} ><FaLongArrowAltLeft className="absolute top-3 left-3 z-10" size={34} color="orange" /></span>
            <span className="text-amber-400 font-game2 text-3xl h-20">Continuar Partida</span>

            <div className="flex flex-col self-start p-4 text-[#fcd34d] font-game2 text-2xl w-10/12  mb-8">
                    <span>Partida</span>
                    <select className="h-12 font-game2 text-2xl p-1 text-black" onChange={handleSelectGame}>
                        <option className="text-xl" defaultChecked></option>
                        {
                            games.map((game:any) => (<option key={game.id} className="text-sm">{game.name}</option>))
                        }
                    </select>
            </div>

            <div className="flex justify-center text-white border h-1/2 w-full">
                {
                    gameInfo !== undefined?
                    <div className="flex flex-col justify-start h-full p-4 w-full items-start">
                        <div className="flex flex-col text-[#fcd34d] font-game2 text-2xl w-full mb-4">
                            <span>Nombre</span>
                            <span className="text-white">{gameInfo.name}</span>
                        </div>
                        <div className="flex flex-col text-[#fcd34d] font-game2 text-2xl w-full mb-4">
                            <span>Jugadores</span>
                            <span className="text-white">
                                {
                                    gameInfo.players.map((p: IUser) => p.name).join(", ")
                                }
                            </span>
                        </div>
                        <div className="flex flex-col text-[#fcd34d] font-game2 text-2xl w-full mb-4">
                            <span>Ronda</span>
                            <span className="text-white">{gameInfo.round}</span>
                        </div>
                        
                    </div>
                    : 
                    false
                }
                
            </div>

            <span className="text-center self-center p-4 text-2xl font-game2 mt-8  bg-[#fcd34d] rounded" onClick={handleContinueGame}>Continuar</span>

            <audio ref={audioRef} muted={!sounds} src={clic_sound} />

        </div>
    )
}