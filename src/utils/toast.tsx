import { Bounce, toast } from "react-toastify";

export const success = (message:string) => (
    toast(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "border border-amber-400 rounded bg-[#100235] text-amber-400 font-game2 text-xl",
        type:'success',
        transition: Bounce,
        })
)

export const error = (message:string) => (
    toast(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type:'error',
        className: "border border-amber-400 rounded bg-[#100235] text-amber-400 font-game2 text-xl",
        transition: Bounce,
        })
)