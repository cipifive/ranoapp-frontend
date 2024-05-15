import { FC, useEffect, useRef, useState } from "react"
import countdown from '../../assets/countdown.mp3'
import { ISound } from "../../models/settings"
import { useSoundStore } from "../../Zustand/soundStore"
import { playSound } from "../../utils/helperFunctions"

export const CountDown:FC<any> = ({ onCountdownEnd, startFrom }):JSX.Element => {

    const audioRef:any = useRef()

    const { sounds }:ISound = useSoundStore()

    const [counter, setCounter] = useState<number>(startFrom);
    
    useEffect(() => {
        let timer: any;
        playSound(audioRef)
        if (counter === -1) {
            onCountdownEnd();
        } else {
            timer = setInterval(() => {
                setCounter((prev) => prev - 1);
            }, 1000);
        }
    return () => clearInterval(timer);
  }, [counter, onCountdownEnd]);

  

  return <h1 className="absolute font-game2 top-[50%] left-[50%]  text-amber-400 countdown">
    {counter === 0 ? <span className="text-center">Go!</span> : counter}
    <audio ref={audioRef} muted={!sounds} src={countdown} />
    </h1>;
}