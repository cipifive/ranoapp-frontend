import { FC, useState } from "react"
import { IUser } from "../../../models/users"
import { createUser } from "../../../services/user_service"
import { success } from "../../../utils/toast"
import { catchResponse } from "../../../utils/helperFunctions"
import { MdAddAPhoto } from "react-icons/md";

export const AddPlayer:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu,
        prevSelectedMenu,
        setUpdateFlag,
        updateFlag
    } = props

    const [newUser, setNewUser] = useState<IUser>({
        id: '000000A',
        name: "",
    })


    const handleCreateUser = async () => {
        try {
            const response = await createUser(newUser)
            if(response.status === 200) {
                setNewUser({
                    id: '000000A',
                    name: "",
                })
                setUpdateFlag(!updateFlag)
                success(response.data.message)
            }
        } catch (err:any) {
            catchResponse(err)
        }
    }
    

    return (
        <div className={`flex justify-start items-center flex-col w-full p-4 h-full pb-20 absolute ${selectedMenu === 3? prevSelectedMenu < selectedMenu? 'screen_component_entrar_derecha'  :  'screen_component_entrar_izquierda' : 'screen_component_salir_izquierda'} `}>
            <span className="text-amber-400 font-game2 text-3xl h-20">Añadir Jugador</span>
            <div className="flex justify-center items-center rounded border border-amber-400 h-1/4  w-3/4 relative">
                
                <MdAddAPhoto size={45} color="orange" />
                    
            </div>
            <div className="flex flex-col justify-start h-2/4 p-4 pt-10 w-full items-start">
                <div className="text-[#fcd34d] font-game2 text-2xl w-full mb-4">
                    <span>Identificador</span>
                    <input onChange={(e:any) => setNewUser({...newUser,id:e.target.value})} value={newUser.id} type="text" max={7} min={7} maxLength={7} className="w-full h-12 font-game2 rounded bg-white text-xl p-1 text-[#100235]" placeholder={'DDMMYYA'} />
                </div>
                <div className="text-[#fcd34d] font-game2 text-2xl w-full mb-8">
                    <span>Nombre</span>
                    <input onChange={(e:any) => setNewUser({...newUser,name:e.target.value})} value={newUser.name} className="w-full h-12 font-game2 rounded bg-white text-xl p-1 text-[#100235]" />
                </div>
                <span onClick={newUser.id === '000000A' || newUser.name === "" || newUser.id.length !== 7? () => {} : () => handleCreateUser()} className={`${newUser.id === '000000A' || newUser.name === "" || newUser.id.length !== 7? 'bg-zinc-300' : ' bg-[#fcd34d]'}  text-center self-center p-4 text-2xl font-game2 rounded`}>Guardar</span>
            </div>
        </div>
    )
}