import { PlayerInfo } from "../models/PlayerInfo";

const busk = (playerInfo: PlayerInfo): PlayerInfo => {
    let earnSuccess = Math.random() > .8;
    if(!earnSuccess) return {...playerInfo, 
      buskingLog: [...playerInfo.buskingLog, 0],
    };

    let money = playerInfo.dollars;
    let moneyEarned = Math.random() * playerInfo.renown 
      * 0.5 * playerInfo.technique ** .5;
    let newDollars = money + moneyEarned;

    return {...playerInfo, 
      dollars: newDollars, 
      buskingLog: [...playerInfo.buskingLog, moneyEarned]};
  }

  export default busk;