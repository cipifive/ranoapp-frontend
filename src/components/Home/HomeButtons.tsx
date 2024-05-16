import { FC, useRef } from "react"
import clic_sound from '../../assets/button_clic.wav'
import { handleClickHomeButton } from "../../utils/helperFunctions"
import { ISound } from "../../models/settings"
import { useSoundStore } from "../../Zustand/soundStore"
import { useNavigate } from "react-router-dom"
import { useTransitionStore } from "../../Zustand/transitionStore"

export const HomeButtons:FC<any> = ():JSX.Element => {

    const { sounds }:ISound = useSoundStore()

    const { setReduce }:any = useTransitionStore()

    const audioRef:any = useRef()

    const navigate:any = useNavigate()

    return(

        <div className="flex flex-col justify-around h-2/4">
            
            <span className="text-center p-4 text-2xl font-game2 bg-amber-500 rounded" onClick={() => handleClickHomeButton("/new-game",audioRef,setReduce,navigate)}>Nueva Partida</span>
            <span className="text-center p-4 text-2xl font-game2 bg-amber-500 rounded" onClick={() => handleClickHomeButton("/continue-game",audioRef,setReduce,navigate)}>Continuar Partida</span>
            <span className="text-center p-4 text-2xl font-game2 bg-amber-500 rounded" onClick={() => handleClickHomeButton("/players",audioRef,setReduce,navigate)}>Jugadores</span>
            <span className="text-center p-4 text-2xl font-game2 bg-amber-500 rounded" onClick={() => handleClickHomeButton("/new-game",audioRef,setReduce,navigate)}>Ajustes</span>
            <audio ref={audioRef} muted={!sounds} src={clic_sound} />
        </div>
    )
}