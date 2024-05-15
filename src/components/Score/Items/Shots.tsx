import { FC } from "react"
import { IRound } from "../../../models/round"
import { useRoundStore } from "../../../Zustand/roundStore"

export const Shots:FC<any> = (props):JSX.Element => {

    const { shot }:IRound = useRoundStore()
    
    return (
        <div className="flex flex-col items-center text-amber-400">
            <span>Tiros</span>
            <span>{shot}</span>
        </div>
    )
}