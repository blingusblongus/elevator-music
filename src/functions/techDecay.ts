import { PlayerInfo } from "../models/PlayerInfo";

const techDecay = (playerInfo: PlayerInfo, practiceLog: number[]): PlayerInfo => {   
    return practiceLog.length ?
      {...playerInfo, technique: playerInfo.technique - .001}
      : playerInfo;
  }

export default techDecay;