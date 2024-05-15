import { FC } from "react"
import { IRound } from "../../../models/round"
import { useRoundStore } from "../../../Zustand/roundStore"

export const Points:FC<any> = (props):JSX.Element => {

    const { points }:IRound = useRoundStore()

    return (
        <div className="flex flex-col items-center text-amber-400">
            <span>Puntos</span>
            <span>{points}</span>
        </div>
    )
}