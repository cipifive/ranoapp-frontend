import axios from "axios";
import { CREATE_GAME, END_GAME, GET_GAME_BY_ID, GET_STARTED_GAMES, SAVE_ROUND } from "../constants/Game/endpoints";
import { INewGame } from "../models/game";

export const createGame = (body:INewGame) => {
    const res = axios.post(CREATE_GAME, body)
    return res
} 

export const getGameByID = (id:number) => {
    const res = axios.get(`${GET_GAME_BY_ID}${id}`)
    return res
}

export const getStartedGames = () => {
    const res = axios.get(`${GET_STARTED_GAMES}`)
    return res
}

export const saveRound = (body:any) => {
    const res = axios.post(`${SAVE_ROUND}`,body)
    return res
}

export const endGame = (body:any) => {
    const res = axios.put(`${END_GAME}`,body)
    return res
}

