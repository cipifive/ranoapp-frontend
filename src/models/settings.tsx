export interface ISound {
    music: boolean,
    sounds: boolean,
    ref: any,
    changeSettings: (music:boolean, sounds:boolean,ref:any) => void,
}