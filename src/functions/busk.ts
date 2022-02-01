import { PlayerInfo } from "../models/PlayerInfo";
import GAME from "../_gameConfig/gameConfig";

const busk = (playerInfo: PlayerInfo): PlayerInfo => {
    let earnSuccess = Math.random() > GAME.busk.successRate;
    if(!earnSuccess) return {...playerInfo, 
      buskingLog: [...playerInfo.buskingLog, 0],
    };

    let money = playerInfo.dollars;
    let moneyEarned = Math.random() * playerInfo.renown 
      * GAME.busk.renownMult * playerInfo.technique ** GAME.busk.techniquePow;
    let newDollars = money + moneyEarned;

    return {...playerInfo, 
      dollars: newDollars, 
      buskingLog: [...playerInfo.buskingLog, moneyEarned]};
  }

  export default busk;