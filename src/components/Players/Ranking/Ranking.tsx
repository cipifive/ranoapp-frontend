import { FC } from "react"
import { RankingTable } from "./RankingTable"

export const Ranking:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu,
        prevSelectedMenu
    } = props
    return (
        <div className={`flex justify-around items-center flex-col w-full p-4 h-full pb-20 absolute ${selectedMenu === 1? 'screen_component_entrar_izquierda' : 'screen_component_salir_izquierda'} `}>
            <span className="text-amber-400 font-game2 text-3xl h-20">Ranking</span>
            <RankingTable />
        </div>
    )
}