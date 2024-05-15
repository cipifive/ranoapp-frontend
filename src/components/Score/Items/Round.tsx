import { FC } from "react"


export const Round:FC<any> = (props):JSX.Element => {
    
    const {
        ronda
    } = props

    return (
        <div className="flex flex-col items-center text-amber-400">
            <span>Ronda</span>
            <span>{ronda}</span>
        </div>
    )
}