import axios from "axios"
import { GET_RANKING } from "../constants/Players/endpoints"

export const getRanking = () => {
    const res = axios.get(`${GET_RANKING}`)
    return res
}