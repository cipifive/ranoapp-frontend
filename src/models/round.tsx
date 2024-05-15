export interface IRound {
    id_user: string,
    round : number,
    shot : number,
    points: number,
    history : any[],
    addShot: (id_user: string, round: number, shot: number, points: number, history : any[]) => void;
    setHistory: (newHistory: any[])  => void,
    setPoints: (newPoints:number) => void
}

export interface ISaveRound {
    id_game: string,
    id_user: string,
    id_round: number,
    points: number,
    boxes: string
}