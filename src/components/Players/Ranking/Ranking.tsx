import { FC, useEffect, useState } from "react"
import { RankingTable } from "./RankingTable"
import { getRanking } from "../../../services/stats_service"
import { Loading } from "../../shared/Loading"

export const Ranking:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu
    } = props

    const [ranking, setRanking] = useState<any[]>([])

    const [loading, setLoading] = useState<boolean>(true)
    
    const fetchRanking = async() => {
        try {
            setLoading(true)
            const response = await getRanking()
            if(response.status === 200) {
                setRanking(response.data.data.sort((a:any, b:any) => b.wins - a.wins))
                setLoading(false)
            }
            setLoading(false)
        } catch (err:any) {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        fetchRanking()
    }, [])

    return (
        <div className={`flex justify-around items-center flex-col w-full p-4 h-full pb-20 absolute ${selectedMenu === 1? 'screen_component_entrar_izquierda' : 'screen_component_salir_izquierda'} `}>
            <span className="text-amber-400 font-game2 text-3xl h-20">Ranking</span>
            {
                loading?
                <Loading message={"Cargando ranking"} />
                :
                <RankingTable data={ranking} />
            }
        </div>
    )
}