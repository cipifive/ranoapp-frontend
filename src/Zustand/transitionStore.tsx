import { create } from "zustand"

export const useTransitionStore = create<{reduce:boolean,setReduce:(reduce:boolean) => void}>((set) => ({
    reduce: false,
    setReduce: (reduce:boolean) => set({ reduce }),
}));
