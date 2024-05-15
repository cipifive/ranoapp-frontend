import { FC } from "react"
import { Points } from "./Items/Points"
import { Shots } from "./Items/Shots"
import { Round } from "./Items/Round"

export const Score:FC<any> = (props):JSX.Element => {

    const {
        ronda
    } = props
    return (
        <div className="flex justify-around items-center w-full h-1/3 font-game2 text-white">
            <Round ronda={ronda} />
            <Points />
            <Shots />
        </div>
    )
}