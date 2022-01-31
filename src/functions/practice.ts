const practice = (dTech: number, pLog: number[]): number => {
    let mod = 1;
    let fatigue = pLog.length > 0 ? pLog.length : 1;
    return dTech + mod/fatigue;
}

export default practice;