import { PlayerInfo } from "../models/PlayerInfo";

const techDecay = (playerInfo: PlayerInfo, practiceLog: number[]): PlayerInfo => {   
    return practiceLog.length || playerInfo.technique < 1.001 ? playerInfo 
        : {...playerInfo, technique: playerInfo.technique - .001}
  }

export default techDecay;