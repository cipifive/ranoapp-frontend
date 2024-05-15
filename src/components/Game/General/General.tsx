import { FC, useEffect, useState } from "react";
import { GeneralTable } from "./GeneralTable";

export const General:FC<any> = (props):JSX.Element => {

    const {
        turn,
        round,
        selectedMenu,
        gameData
    } = props

    const parseGameData = (gameData:any) => {
        let parsedData:any[] = []
        gameData.players.forEach((player:any) => {
            let { history } = gameData
            let playerRounds = history.filter((h:any) => h.id_user === player.id)
            console.log(playerRounds)
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

  
    return (
        <div className={`h-full w-full flex flex-col justify-start items-start  ${selectedMenu === 1? 'screen_component_entrar_izquierda' : 'screen_component_salir_izquierda'} `}>
            <span className="text-amber-400 font-game2 text-2xl ">Partida {gameData.name}</span>
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
            <GeneralTable data={parseGameData(gameData)} turn={turn} />
        </div>
    )
}