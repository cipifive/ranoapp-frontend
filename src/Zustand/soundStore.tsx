import { create } from "zustand"
import { ISound } from "../models/settings";

export const useSoundStore = create<ISound>((set) => ({
    music: false,
    sounds: true,
    ref: null,
    changeSettings: (music:boolean,sounds:boolean,ref:null) => set({music,sounds,ref})
   
}));
