import { FC, useRef } from "react"
import { IRound } from "../../../models/round"
import { useRoundStore } from "../../../Zustand/roundStore"
import { GiFrogPrince } from "react-icons/gi";
import frog_sound from '../../../assets/frog.mp3'
import { playSound } from "../../../utils/helperFunctions";

export const Frog:FC<any> = (props):JSX.Element => {

    const { id, selectedShot, turn }:any = props
    
    const audioRef:any = useRef()

    const { addShot,round,shot,points,history }:IRound = useRoundStore()


    const handleAddShot = () => {
        let items = history.filter((h:any) => h.box === id).length
        const top = -2 + items*12
        addShot(turn.id,round,shot + 1,points + 50,[...history,{round:round,shot:shot,points:50,box:id,x:top,y:0}])
        playSound(audioRef)
    }
    return (
        <div className="flex justify-center items-center  bg-[#100235] border rounded text-amber-400  relative" onClick={shot === 10? () => {} : () => handleAddShot()}>
            {
                selectedShot !== 11?
                history.filter((ss:any) => selectedShot === ss.shot).map((h:any) => {
                    if(h.box === id) {
                        return (
                            <span key={`${h.round}.${h.shot}`} className={`absolute text-sm`} style={{top:h.x,right:h.y,fontWeight:"bold"}}>{h.shot + 1}</span>
                        )
                    }
                })
                :
                    history.map((h:any) => {
                        if(h.box === id) {
                            return (
                                <span key={`${h.round}.${h.shot}`} className={`absolute text-sm`} style={{top:h.x,right:h.y,fontWeight:"bold"}}>{h.shot + 1}</span>
                            )
                        }
                    })
            }
            <audio ref={audioRef} src={frog_sound} />
            <GiFrogPrince size={65} />
        </div>
    )
}