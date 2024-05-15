import { FC, useEffect, useRef, useState } from "react"
import { NavigationBar } from "../../components/Players/NavigationBar/NavigationBar"
import { Ranking } from "../../components/Players/Ranking/Ranking"
import { FaLongArrowAltLeft } from "react-icons/fa";
import { handleClickHomeButton, playSound } from "../../utils/helperFunctions";
import { useTransitionStore } from "../../Zustand/transitionStore";
import { useNavigate } from "react-router-dom";
import { ISound } from "../../models/settings";
import { useSoundStore } from "../../Zustand/soundStore";
import clic_sound from '../../assets/button_clic.wav'
import menu_sound from '../../assets/change_menu.mp3'
import { AddPlayer } from "../../components/Players/AddPlayer/AddPlayer";
import { EditPlayer } from "../../components/Players/EditPlayer/EditPlayer";
import { getUsers } from "../../services/user_service";
import { IUser } from "../../models/users";

export const Players:FC<any> = ():JSX.Element => {

    const [users, setUsers] = useState<IUser[]>([])

    const [updateFlag, setUpdateFlag] = useState<boolean>(false)

    const [selectedMenu, setSelectedMenu] = useState<number>(1)
    const [prevSelectedMenu, setPrevSelectedMenu] = useState<number>(0)
    const [startX, setStartX] = useState<any>(null)

    const { sounds }:ISound = useSoundStore()

    const { setReduce }:any = useTransitionStore()

    const audioRef:any = useRef()
    const audioRefMenu:any = useRef()

    const navigate:any = useNavigate()

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

    const renderMenuContent = () => {
        switch(selectedMenu) {
            case 1:
                return (<Ranking selectedMenu={selectedMenu} prevSelectedMenu={prevSelectedMenu} />)
            case 2:
                return (<div className={`text-white ${selectedMenu === 2? prevSelectedMenu === 1? 'screen_component_entrar_derecha' : 'screen_component_entrar_izquierda' : selectedMenu < 2? 'screen_component_salir_derecha' : 'screen_component_salir_izquierda' }`}>AA</div>)
            case 3:
                return (<AddPlayer
                    selectedMenu={selectedMenu}
                    prevSelectedMenu={prevSelectedMenu}
                    updateFlag={updateFlag}
                    setUpdateFlag={setUpdateFlag}
                    /> )    
            case 4:
                return (<EditPlayer
                    selectedMenu={selectedMenu}
                    prevSelectedMenu={prevSelectedMenu} 
                    users={users}
                    updateFlag={updateFlag}
                    setUpdateFlag={setUpdateFlag}
                    /> )
        }
    }

    const fetchUsers = async() => {
        try {
            const response = await getUsers()
            console.log(response)
            const { data } = response
            setUsers(data)
        } catch (err:any) {
            
        }
    }

    useEffect(() => {
        playSound(audioRefMenu)
    }, [selectedMenu])

    useEffect(() => {
        fetchUsers()
    },[updateFlag])

    return (
        <div className="h-full screen_component_aument relative">
            <span  onClick={() => handleClickHomeButton("/", audioRef,setReduce,navigate)} ><FaLongArrowAltLeft className="absolute top-3 left-3 z-10" size={34} color="orange" /></span>
            <NavigationBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <div className=" h-full pb-16 " onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                {renderMenuContent()}
            </div>
            <audio ref={audioRef} muted={!sounds} src={clic_sound} />
            <audio ref={audioRefMenu} muted={!sounds} src={menu_sound} />
        </div>
    )
}