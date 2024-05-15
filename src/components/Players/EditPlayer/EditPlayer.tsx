import { FC, useState } from "react"
import { IUser } from "../../../models/users"
import { updateUser } from "../../../services/user_service"
import { success } from "../../../utils/toast"
import { catchResponse } from "../../../utils/helperFunctions"
import { MdAddAPhoto } from "react-icons/md"

export const EditPlayer:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu,
        users,
        updateFlag,
        setUpdateFlag
    } = props

    const [selectedUser, setSelectedUser] = useState<IUser | undefined>()

    const [newName, setNewName] = useState<string>("")

    const handleSelectUser = (e:any) => {
        const name = e.target.value
        setSelectedUser(users.find((user:IUser) => user.name === name))
        setNewName(name)
    }

    const handleEditUser = async() => {
        try {
            let body:IUser = {
                id: selectedUser?.id ?? '000000A',
                name: newName,
            }
            const response:any = await updateUser(body)
            if(response.status === 200) {
                success(response.data.message)
                setUpdateFlag(!updateFlag)
            }
        } catch (err:any) {
            catchResponse(err)
        }
    }

    return (
        <div className={`flex justify-start items-center flex-col w-full p-4 h-full pb-20 absolute ${selectedMenu === 4? 'screen_component_entrar_derecha'  : 'screen_component_salir_derecha'} `}>
            
            <span className="text-amber-400 font-game2 text-3xl h-20">Editar Jugador</span>

                <div className="flex flex-col self-start p-4 text-[#fcd34d] font-game2 text-2xl w-10/12  mb-8">
                    <span>Jugador</span>
                    <select className="h-12 font-game2 text-2xl p-1 text-black" onChange={handleSelectUser}>
                        <option className="text-xl" defaultChecked></option>
                        {
                            users.map((user:IUser) => (<option key={user.id} className="text-sm">{user.name}</option>))
                        }
                    </select>
                </div>

                <div  className="flex justify-center items-center rounded border border-amber-400 h-1/4  w-3/4 relative">
                
                <MdAddAPhoto size={45} color="orange" />
                    
            </div>
            <div className="flex flex-col justify-start h-2/4 p-4 pt-10 w-full items-start">
                
                <div className="text-[#fcd34d] font-game2 text-2xl w-full mb-8">
                    <span>Nombre</span>
                    <input className="w-full h-12 font-game2 rounded  text-xl p-1 text-[#100235]" value={newName} onChange={(e:any) => setNewName(e.target.value)} />
                </div>
                <span onClick={selectedUser && newName !== "" && selectedUser.name !== newName? () => handleEditUser() : () => {}} className={`${selectedUser && newName !== "" && selectedUser.name !== newName? ' bg-[#fcd34d]' : 'bg-zinc-300'} text-center self-center p-4 text-2xl font-game2  rounded`}>Actualizar</span>
            </div>
            
        </div>
    )
}

