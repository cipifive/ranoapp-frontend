import { FC, useState } from "react";
import { GeneralTable } from "./GeneralTable";
import { GiQueenCrown } from "react-icons/gi";
import { endGame } from "../../../services/game_service";
import { useNavigate, useParams } from "react-router-dom";
import { error, success } from "../../../utils/toast";

export const General:FC<any> = (props):JSX.Element => {

    const {
        turn,
        round,
        selectedMenu,
        gameData
    } = props


    const [loading, setLoading] = useState<boolean>(false)

    const {id}:any = useParams()

    const navigate:any = useNavigate()

    const parseGameData = (gameData:any) => {
        let parsedData:any[] = []
        gameData.players.forEach((player:any) => {
            let { history } = gameData
            let playerRounds = history.filter((h:any) => h.id_user === player.id)
          
            let row:any = {
                id : player.id,
                name: player.name
            }
            let acc: number = 0
            let frogs : number = 0
            playerRounds.forEach((round:any) => {
                row[`round${round.id_round}`] = parseInt(round.points)
                acc += parseInt(round.points)
                let frog = round.boxes.filter((b:any) => b === 5).length
                frogs += frog
            });
            row['total'] = acc
            row['frogs'] = frogs
            parsedData.push(row)
        });
       
      return parsedData 
    }

    const handleEndGame = async() => {
        try {
            setLoading(true)
            let body = {
                id_game: id,
                id_user: parseGameData(gameData).reduce((objetoMax:any, objetoActual:any) => objetoActual.total > objetoMax.total ? objetoActual : objetoMax)?.id
            }
            const response = await endGame(body)
            if(response.status === 200) {
                setLoading(false)
                success("Partida finalizada!")
                navigate("/")
            }
            setLoading(false)
        } catch (err:any) {
            setLoading(false)
            error(err)
        }
    }

  
    return (
        <div className={`h-full w-full flex flex-col justify-start items-start  ${selectedMenu === 1? 'screen_component_entrar_izquierda' : 'screen_component_salir_izquierda'} `}>
            <span className="text-amber-400 font-game2 text-2xl ">Partida {gameData.name}</span>
            {
                    round <= 10?
                        <div className="flex justify-around p-2 border rounded  items-center w-full mb-2">
                            <div className="flex flex-col justify-center items-center">
                                <span className="text-amber-400 font-game2 text-2xl ">Turno</span>
                                <span className="text-amber-400 font-game2 text-xl">{turn?.name}</span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <span className="text-amber-400 font-game2 text-2xl ">Ronda</span>
                                <span className="text-amber-400 font-game2 text-xl ">{round}</span>
                            </div>
                        </div>
                    :
                        <div className="flex justify-around p-2 border rounded  items-center w-full mb-2">
                    
                            <div className="flex flex-col justify-center items-center">
                                <span className="text-amber-400 font-game2 text-2xl "><GiQueenCrown size={40} /></span>
                                <span className="text-amber-400 font-game2 text-xl">
                                    {
                                        parseGameData(gameData).reduce((objetoMax:any, objetoActual:any) => objetoActual.total > objetoMax.total ? objetoActual : objetoMax)?.name
                                    }
                                </span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <span onClick={loading? () => {} : () => handleEndGame()} className={`${loading? 'bg-zinc-300' : 'bg-[#fcd34d]'} w-[120px]  text-center self-center p-4 text-2xl font-game2  rounded`}>{loading? <div className="lds-ellipsis-btn"><div></div><div></div><div></div><div></div></div> : 'Finalizar'}</span>
                            </div>
                        </div>

            }
            
            <GeneralTable data={parseGameData(gameData)} turn={turn} round={round} />
        </div>
    )
}