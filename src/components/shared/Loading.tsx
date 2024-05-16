import { FC } from "react"

export const Loading:FC<any> = (props) => {

    const {
        isButton,
        message
    } = props
    if(isButton) {
        <div className={`lds-ellipsis-btn`}><div></div><div></div><div></div><div></div></div>
    } else {
        return (
            <span className="text-amber-400 h-4/5 flex flex-col justify-center items-center font-game2">
                <span className="text-xl">{message}</span>
                <div className={`lds-ellipsis`}><div></div><div></div><div></div><div></div></div>
            </span>
            
        )
    }
    
}