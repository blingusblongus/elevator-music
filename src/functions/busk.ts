import { PlayerInfo } from "../models/PlayerInfo";

const busk = (playerInfo: PlayerInfo) => {
    let earnSuccess = Math.random() > .8;
    if(!earnSuccess) return playerInfo;

    let money = playerInfo.dollars;
    let moneyEarned = Math.random() * playerInfo.renown * 0.5 ;
    let newDollars = money + moneyEarned;

    return {...playerInfo, dollars: newDollars};
  }

  export default busk;