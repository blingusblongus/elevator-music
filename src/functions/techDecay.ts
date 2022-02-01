import { PlayerInfo } from "../models/PlayerInfo";

const techDecay = (playerInfo: PlayerInfo): PlayerInfo => {  
    const DECAYFLOOR = .75; 
    return playerInfo.practiceLog.length 
      || playerInfo.technique < playerInfo.maxTech * DECAYFLOOR 
      ? playerInfo : {...playerInfo, technique: playerInfo.technique - .001}
  }

export default techDecay;