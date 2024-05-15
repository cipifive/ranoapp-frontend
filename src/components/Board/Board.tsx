import { FC, useState } from "react"
import { Hole } from "./Items/Hole"
import { Frog } from "./Items/Frog"
import { Bridge } from "./Items/Bridge"
import { Mill } from "./Items/Mill"
import { IRound, ISaveRound } from "../../models/round"
import { useRoundStore } from "../../Zustand/roundStore"
import { Score } from "../Score/Score"
import { useParams } from "react-router-dom"
import { saveRound } from "../../services/game_service"
import { EditShotModal } from "./EditShotModal/EditShotModal"

export const Board:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu,
        setSelectedMenu,
        turn,
        ronda,
        setNextPlayer,
        nextPlayer,
        gameData
    } = props

    const { addShot,shot,points,history }:IRound = useRoundStore()

    const [selectedShot, setSelectedShot] = useState<number>(11)

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const { id }:any = useParams()

    


    const handleSelectShot = (e:any) => {
        setSelectedShot(parseInt(e.target.value))
    }

    const handleEditShot = () => {
        setModalIsOpen(true)
    }

    const handleAddShot = () => {
        let items = history.filter((h:any) => h.box === 10).length
        const right = 10 + items*10
        addShot(turn.id,ronda,shot + 1,points + 0,[...history,{round:ronda,shot:shot,points:0,box:10,x:0,y:right}])
    }

    const handleSave = async() => {
        try {
            console.log(gameData)
            let body:ISaveRound = {
                id_game: id,
                id_user: turn.id,
                id_round: ronda,
                points: points,
                boxes: JSON.stringify(history.map((h:any) => h.box))
            }

            const res = await saveRound(body)
            if(res.status === 200){
                setNextPlayer(!nextPlayer)
                setSelectedMenu(1)
                addShot("",1,0,0,[])
            }
            
        } catch (err:any) {
            
        }
        
    }
    
    return (
        <div className={` flex flex-col h-full ${selectedMenu === 2? 'screen_component_entrar_derecha'  : 'screen_component_salir_derecha'}`}>
            <EditShotModal 
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                selectedShot={selectedShot}
                history={history}
            />
            <div className="flex justify-around p-2 border rounded  items-center w-full mb-2">
                <div className="flex flex-col justify-center items-center">
                     <span className="text-amber-400 font-game2 text-2xl ">Turno</span>
                     <span className="text-amber-400 font-game2 text-xl">{turn?.name}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                     <Score ronda={ronda} />
                </div>
            </div>
            <div className="">
                <select className="p-3 font-game2 rounded  w-10/12" onChange={handleSelectShot}>
                    <option value={11}>Todas</option>
                    {history.map((h:any) => {
                        return <option value={h.shot}>Lanzamiento {h.shot + 1}</option>
                    })}
                </select>
            </div>
            <div className="grid grid-cols-3 p-2 gap-4 h-1/2 w-full  ">
                <Hole
                    selectedShot={selectedShot}
                    id={1} 
                    turn={turn}
                    />
                <Hole
                    selectedShot={selectedShot}
                    id={2} 
                    turn={turn}
                    />
                <Hole
                    selectedShot={selectedShot} 
                    id={3} 
                    turn={turn}
                    />
                <Hole
                    selectedShot={selectedShot} 
                    id={4} 
                    turn={turn}
                    />
                <Frog
                    selectedShot={selectedShot}
                    id={5}
                    turn={turn}
                    />
                <Hole
                    selectedShot={selectedShot}
                    id={6}
                    turn={turn}
                    />
                <Bridge
                    selectedShot={selectedShot}
                    id={7}
                    turn={turn}
                    />
                <Mill 
                    selectedShot={selectedShot}
                    id={8}
                    turn={turn}
                    />
                <Bridge
                    selectedShot={selectedShot}
                    id={9}
                    turn={turn}
                    />
            </div>
            <div className="flex justify-center items-center text-3xl  bg-[#100235] border rounded text-amber-400 mr-2 ml-2  rounded h-16 relative" onClick={shot === 10? () => {} : () => handleAddShot()}>
                <span className="font-game2">FUERA</span>
                {
                selectedShot !== 11?
                history.filter((ss:any) => selectedShot === ss.shot).map((h:any) => {
                    if(h.box === 10) {
                        return (
                            <span key={`${h.round}.${h.shot}`} className={`absolute text-sm`} style={{top:h.x,right:h.y,fontWeight:"bold"}}>{h.shot + 1}</span>
                        )
                    }
                })
                :
                    history.map((h:any) => {
                        if(h.box === 10) {
                            return (
                                <span key={`${h.round}.${h.shot}`} className={`absolute text-sm`} style={{top:h.x,right:h.y,fontWeight:"bold"}}>{h.shot + 1}</span>
                            )
                        }
                    })
            }
            </div>
            <div className="flex w-full justify-around items-center p-4  mt-2 rounded">
                <span onClick={selectedShot === 11? () => {} : () => handleEditShot()} className={`text-center w-1/3 p-3 text-xl font-game2 ${selectedShot === 11? 'bg-zinc-300' : 'bg-[#fcd34d]'}   rounded`}>Editar</span>
                <span className={`text-center w-1/3  p-3 text-xl font-game2   rounded ${shot < 10? 'bg-zinc-300' : 'bg-[#fcd34d]'}`} onClick={shot === 10? () => handleSave() : () => {}}>Guardar</span>
            </div>
            
        </div>
        
    )
}