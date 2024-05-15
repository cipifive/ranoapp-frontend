import { IUser } from "./users";

export interface INewGame {
    name: string,
    players : IUser[]
}