import { FC } from "react";
import { useTransitionStore } from "../Zustand/transitionStore";

export const AppLayout:FC<any> = (props):JSX.Element => {

    const {
        Component,
    } = props

   const { reduce }:any = useTransitionStore()

    return (
        <div className={`flex flex-col  h-full w-full overflow-x-hidden overflow-y-hidden relative  ${reduce? 'screen_component_reduce' : 'screen_component_aument'} `}>
            <Component />  
        </div>
    )
}