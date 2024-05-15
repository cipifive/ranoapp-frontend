import axios from "axios";
import { CREATE_USER, GET_USERS, UPDATE_USER } from "../constants/Players/endpoints";
import { IUser } from "../models/users";

export const getUsers = () => {
    const res = axios.get(GET_USERS)
    return res
} 

export const createUser = (body:IUser) => {
    const res = axios.post(CREATE_USER,body)
    return res
}

export const updateUser = (body:IUser) => {
    const res = axios.put(UPDATE_USER,body)
    return res
}