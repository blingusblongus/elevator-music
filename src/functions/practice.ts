import GAME from "../_gameConfig/gameConfig";

const practice = (dTech: number, pLog: number[]): number => {
    let mod = GAME.practice.mod;
    let fatigue = pLog.length > 0 ? pLog.length : 1;
    return dTech + mod/fatigue;
}

export default practice;