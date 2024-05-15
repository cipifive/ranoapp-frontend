import { create } from "zustand"
import { IRound } from "../models/round";

export const useRoundStore = create<IRound>((set) => ({
    id_user: "",
    round: 1,
    shot: 0,
    points: 0,
    history: [],
    addShot: (id_user:string, round:number, shot:number, points:number, history:any[]) => set({ id_user, round, shot, points, history }),
    setHistory: (newHistory: any[]) => set({ history: newHistory }),
    setPoints: (newPoints:number) => set({points:newPoints})
}));
