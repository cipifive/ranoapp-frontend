import { FC } from "react"
import { HomeButtons } from "../../components/Home/HomeButtons"
import { HomeSettings } from "../../components/Home/HomeSettings"

export const Home:FC<any> = ():JSX.Element => {

    return (
        <div className={`flex flex-col justify-center items-center h-full relative `}>
            <HomeSettings />
            <h1 className="font-game2 text-white h-1/3 flex justify-center items-center">RanoAPP</h1>
            <HomeButtons /> 
        </div>
    )
}