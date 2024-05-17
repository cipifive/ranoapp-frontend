import { FC, useState } from "react"
import { Loading } from "../../shared/Loading"
import { IUser } from "../../../models/users"
import { getStatsByUserID } from "../../../services/stats_service"
import { GiFrogPrince, GiHole } from "react-icons/gi"
import { FaBridge } from "react-icons/fa6"
import { PiSpinnerBallLight } from "react-icons/pi"

export const Stats:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu,
        prevSelectedMenu,
        users
    } = props

    const [selectedUser, setSelectedUser] = useState<IUser | undefined>()

    const [userStats, setUserStats] = useState<any>()

    const [loading, setLoading] = useState<boolean>(false)

    const handleSelectUser = async(e:any) => {
        try {
            setLoading(true)
            const name = e.target.value
            setSelectedUser(users.find((user:IUser) => user.name === name))
            const response = await getStatsByUserID(users.find((user:IUser) => user.name === name)?.id)
            if(response.status === 200) {
                setLoading(false)
                setUserStats(response.data.data)
                console.log(response.data.data)
            }
            setLoading(false)
        } catch (err:any) {
            setLoading(false)
        }
        
     }

   

    return (
        <div className={`flex justify-start items-center flex-col w-full p-4 h-full pb-20 absolute ${selectedMenu === 2? prevSelectedMenu < selectedMenu? 'screen_component_entrar_derecha'  :  'screen_component_entrar_izquierda' : 'screen_component_salir_izquierda'} `}>
            <span className="text-amber-400 font-game2 text-3xl h-20">Estadísticas</span>
                <div className="flex flex-col self-start p-4 text-[#fcd34d] font-game2 text-2xl w-10/12  ">
                    <span>Jugador</span>
                    <select className="h-12 font-game2 text-2xl p-1 bg-white text-black" onChange={handleSelectUser}>
                        <option className="text-xl" defaultChecked></option>
                        {
                            users.map((user:IUser) => (<option key={user.id} className="text-sm">{user.name}</option>))
                        }
                    </select>
                </div>
            {
                loading?
                <Loading message={`Cargando estadísticas de ${selectedUser?.name}`} />
                :
                <div className="w-full h-full">
                    {
                        selectedUser?
                            <div className="flex flex-col items-center text-amber-400  h-full">
                                <div className="flex justify-around items-center mb-4 w-full">
                                    
                                    <div className="flex flex-col justify-center items-center border bg-amber-400  rounded p-2 w-3/12">
                                        <span className=" text-[#100235] font-game2 text-xl ">Partidas</span>
                                        <span className=" text-[#100235] font-game2 text-xl">{userStats?.games}</span>
                                    </div>
                                    
                                    <div className="flex flex-col justify-center items-center border bg-amber-400 rounded p-2 w-3/12">
                                        <span className=" text-[#100235] font-game2 text-xl ">Ganados</span>
                                        <span className=" text-[#100235] font-game2 text-xl">{userStats?.wins}</span>
                                    </div>

                                    <div className="flex flex-col justify-center items-center border bg-amber-400 rounded p-2 w-3/12">
                                        <span className=" text-[#100235] font-game2 text-xl ">Ratio</span>
                                        <span className=" text-[#100235] font-game2 text-xl">{(userStats?.wins / userStats?.games) * 100}%</span>
                                    </div>
                                </div>
                                <div className="flex justify-around items-center mb-4 w-full">
                                    <div className="flex flex-col justify-center items-center border bg-amber-400 rounded p-2 w-3/12">
                                        <span className=" text-[#100235] font-game2 text-xl ">Puntos</span>
                                        <span className=" text-[#100235] font-game2 text-xl">{userStats?.points}</span>
                                    </div>

                                    <div className="flex flex-col justify-center items-center border bg-amber-400 rounded p-2 w-3/12">
                                        <span className=" text-[#100235] font-game2 text-xl ">Tiradas</span>
                                        <span className=" text-[#100235] font-game2 text-xl">{userStats?.shots}</span>
                                    </div>

                                    <div className="flex flex-col justify-center items-center border bg-amber-400 rounded p-2 w-3/12">
                                        <span className=" text-[#100235] font-game2 text-xl ">Ratio</span>
                                        <span className=" text-[#100235] font-game2 text-xl">{(userStats?.points / userStats?.shots).toFixed(2)}</span>
                                    </div>
                                </div>
                               
                                <div className="grid grid-cols-3 p-2 gap-4 h-1/2 w-4/5  ">
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400    border rounded relative`}>
                                        <GiHole size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.hole_1.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.hole_1.percent}%</span>
                                    </div>
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400    border rounded relative`}>
                                        <GiHole size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.hole_2.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.hole_2.percent}%</span>
                                    </div>
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400   border rounded  relative`}>
                                        <GiHole size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.hole_3.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.hole_3.percent}%</span>
                                    </div>
                                    
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400   border rounded  relative`} >
                                        <GiHole size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.hole_4.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.hole_4.percent}%</span>
                                    </div>
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400}   border rounded  relative`} >
                                        <GiFrogPrince size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.frog.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.frog.percent}%</span>
                                        
                                    </div>
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400   border rounded  relative`}>
                                        <GiHole size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.hole_6.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.hole_6.percent}%</span>
                                    </div>
                                    <div className={`flex justify-center itens-center rounded bg-[#100235] text-amber-400   border rounded  relative`} >
                                        <FaBridge size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.bridge_7.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.bridge_7.percent}%</span>
                                    </div>
                                    <div className={`flex justify-center items-center rounded bg-[#100235] text-amber-400   border rounded relative`}>
                                        <PiSpinnerBallLight  size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.mill.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.mill.percent}%</span>
                                    </div>
                                    <div className={`flex justify-center itens-center rounded bg-[#100235] text-amber-400   border rounded  relative`} >
                                        <FaBridge size={65} style={{opacity:0.25}} />
                                        <span className="font-game2 absolute top-1">{userStats?.bridge_9.count} tiros</span>
                                        <span className="font-game2 absolute text-2xl bottom-1">{userStats?.bridge_9.percent}%</span>
                                    </div>
                                </div>
                                <div className={`flex justify-center items-center bg-[#100235] text-amber-400 text-3xl   border rounded  w-4/5 rounded h-16 relative`}   >
                                    <span className={`font-game2 `} style={{opacity:0.25}}>FUERA</span>
                                        <span className="font-game2 absolute text-sm top-1">{userStats?.out.count} tiros</span>
                                        <span className="font-game2 absolute bottom-1">{userStats?.out.percent}%</span>
                                </div>

                                </div>

                           
                        :
                            <div className="flex justify-center items-center border rounded w-full h-full">
                                <span className="font-game2 text-amber-400 text-xl text-center">Selecciona un jugador para ver sus estadísticas.

                                </span>
                            </div>
                        
                    }
                </div>
            }
        </div>
    )
}