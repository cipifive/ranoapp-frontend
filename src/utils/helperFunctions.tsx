import { error } from "./toast";

export const playSound = (ref:any) => {
    ref.current.play();
}

export const playSoundButton = (ref:any) => {
    ref.current.play()
}

export const handleClickHomeButton = (path:string, ref:any,callBack:any,callBack2:any) => {
    playSoundButton(ref)
    callBack(true)
        setTimeout(() => {
            callBack(false)
            callBack2(path)
        },350)
}

export const catchResponse = (err:any) => {
    console.log(err)
    if ('message' in err.response.data) {
        const { message } =  err.response.data
        error(message)
    } else {
        error("Error de conexión")
    }
}