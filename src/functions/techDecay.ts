import { PlayerInfo } from "../models/PlayerInfo";
import GAME from "../_gameConfig/gameConfig";

const techDecay = (playerInfo: PlayerInfo): PlayerInfo => {   
    return playerInfo.practiceLog.length 
      || playerInfo.technique < playerInfo.maxTech * GAME.techDecay.floor
      ? playerInfo 
      : {...playerInfo, technique: playerInfo.technique - GAME.techDecay.rate}
  }

export default techDecay;