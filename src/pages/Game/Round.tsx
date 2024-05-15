import { FC } from "react"
import { Score } from "../../components/Score/Score"
import { Board } from "../../components/Board/Board"

export const Round:FC<any> = ():JSX.Element => {
    return (
        <div className="h-full w-full relative">
            <Score />
            <Board />
        </div>
    )
}