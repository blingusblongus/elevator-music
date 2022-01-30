import './App.css';
import { useState, useEffect } from 'react';
import { PlayerInfo } from './models/PlayerInfo';
import { Counter } from './models/Counter';

function App() {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    dollars: 0,
    renown: 1,
    technique: 1,
  });
  const [seconds, setSeconds] = useState<number>(0);


  const plusOne = () => {
    setPlayerInfo({...playerInfo, dollars: playerInfo.dollars + 1})
  }

  const countSecond = (playerInfo?: PlayerInfo) => {
    setSeconds(seconds => seconds + 1);
    return playerInfo;
  }

  // This pauses the count, because it rerenders and resets the timeout.
  // I will have to count ms as the counter, in order to calculate it when clicking fast
  const practice = (playerInfo: PlayerInfo) => {
    let mod = 1;
    setPlayerInfo({...playerInfo, technique: playerInfo.technique + mod})
    // return {...playerInfo, technique: playerInfo.technique + mod};
  }

  const busk = (playerInfo: PlayerInfo) => {
    let earnSuccess = Math.random() > 0.8;
    if(!earnSuccess) return playerInfo;

    let money = playerInfo.dollars;
    let moneyEarned = Math.random() * playerInfo.renown * 0.5 ;
    console.log('money', money)
    console.log('moneyEarned', moneyEarned)
    let newDollars = money + moneyEarned;

    // setPlayerInfo({...playerInfo, dollars: newDollars});
    return {...playerInfo, dollars: newDollars};
  }

  const techDecay = (playerInfo: PlayerInfo) => {
    // setPlayerInfo({...playerInfo, technique: playerInfo.technique - .001})
    return {...playerInfo, technique: playerInfo.technique - .001}
  }


  let fns: Counter[] = [{fn: countSecond, args:[]}, 
    {fn: techDecay, args: []},
    {fn: busk, args:[]}];

  useEffect(() => {
    const interval = setTimeout(() => {
      // this has to be reduce, where the passthrough var is the playerInfo
      const newInfo = fns.reduce((p: PlayerInfo, counter) => {
        console.log(counter.fn.name, playerInfo)
        return p = counter.fn(p, ...counter.args);
      }, playerInfo);
      console.log(newInfo);
      setPlayerInfo(newInfo);
    }, 1000);

    

    return () => clearTimeout(interval);
  })

  return (
    <div className="App">
      <header className="App-header">
        <div>Seconds: {seconds}</div>
        <div>Money: ${playerInfo.dollars.toFixed(2)}</div>
        <div>Renown: {playerInfo.renown.toFixed(2)}</div>
        <div>Technique: {playerInfo.technique.toFixed(3)}</div>
        <button onClick={() => practice(playerInfo)}>Practice</button>
      </header>

    </div>
  );
}

export default App;
