import { PlayerInfo } from "../models/PlayerInfo";

const techDecay = (playerInfo: PlayerInfo) => {
    return {...playerInfo, technique: playerInfo.technique - .001}
  }

export default techDecay;