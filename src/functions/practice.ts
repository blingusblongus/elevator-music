import { PlayerInfo } from "../models/PlayerInfo";
import GAME from "../_gameConfig/gameConfig";

const practice = (playerInfo: PlayerInfo): PlayerInfo => {
    let mod = GAME.practice.mod;
    let fatigue = playerInfo.practiceLog.length > 0 ? 
        playerInfo.practiceLog.length : 1;
    
    playerInfo.practiceLog.unshift(Date.now());

    return {...playerInfo, technique: playerInfo.technique + mod/fatigue};
}

export default practice;