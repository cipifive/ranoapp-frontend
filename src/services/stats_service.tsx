import axios from "axios"
import { GET_RANKING, GET_STATS_BY_USER_ID } from "../constants/Players/endpoints"

export const getRanking = () => {
    const res = axios.get(`${GET_RANKING}`)
    return res
}

export const getStatsByUserID = (id:string) => {
    const res = axios.get(`${GET_STATS_BY_USER_ID}${id}`)
    return res
}