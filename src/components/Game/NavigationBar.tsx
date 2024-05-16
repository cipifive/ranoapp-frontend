import { FC } from "react"
import { menus } from "../../constants/Game/NavigationBar/menus"


export const NavigationBar:FC<any> = (props):JSX.Element => {

    const {
        selectedMenu,
        setSelectedMenu,
        round
    } = props
    return (
        <div className="flex justify-around items-center font-game2  bg-[#100235] text-amber-400 h-16 w-full bottom-0 z-10 absolute">
        {
            menus.map((m:any) => {
                return (
                    <div onClick={round <=10? () => setSelectedMenu(m.id) : () => {}} className={`flex flex-col items-center h-full border border-amber-400 w-full ${m.id === selectedMenu? 'bg-amber-400 text-[#100235]' : ''}  justify-center p-4`}>
                        <span>{m.icon}</span>
                        <span className="text-sm">{m.name}</span>
                    </div>
                )
            })
        }
        </div>
    )
}