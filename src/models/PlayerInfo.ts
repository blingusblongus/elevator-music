import { fn } from "./fn";

export interface PlayerInfo {
    dollars: number;
    renown: number;
    technique: number;
    startDate: number;
    lastTick: number;
    timePlayed: number;
    practiceLog: number[];
    buskingLog: number[];
    maxTech: number; 
    fns: fn[];
}