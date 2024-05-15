import { BsTrophy } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";

export const menus:any[] = [
    {
        id: 1,
        name: "Ranking",
        icon: <BsTrophy size={26} />
    },
    {
        id: 2,
        name: "Stats",
        icon: <IoStatsChart size={26} />
    },
    {
        id: 3,
        name: "Añadir",
        icon: <IoPersonAddOutline size={26} />
    },
    {
        id: 4,
        name: "Editar",
        icon: <LiaUserEditSolid size={26} />
    },
]