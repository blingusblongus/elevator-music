import './App.css';
import { useState, useEffect } from 'react';
import { PlayerInfo } from './models/PlayerInfo';
import { Counter } from './models/Counter';

const tickCheck = 200;
const tickDuration = 1000;

function App() {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    dollars: 0,
    renown: 1,
    technique: 1,
    startDate: Date.now(),
    lastTick: Date.now(),
    timePlayed: 0,
  });


  const plusOne = () => {
    setPlayerInfo({...playerInfo, dollars: playerInfo.dollars + 1})
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
    let newDollars = money + moneyEarned;

    return {...playerInfo, dollars: newDollars};
  }

  const techDecay = (playerInfo: PlayerInfo) => {
    return {...playerInfo, technique: playerInfo.technique - .001}
  }

  let fns: Counter[] = [ 
    {fn: techDecay, args: []},
    {fn: busk, args:[]}
  ];

  useEffect(() => {
    const interval = setTimeout(() => {

      let now = Date.now();
      let timePassed = now - playerInfo.lastTick;
      let ticksPassed = timePassed / tickDuration;
      let pInfo = playerInfo;
      console.log('tickspassed', ticksPassed)

      if(ticksPassed > 1){
        for(let i=0; i<ticksPassed; i++){
          pInfo = fns.reduce((p: PlayerInfo, counter) => {

            return p = counter.fn(p, ...counter.args);
          }, pInfo);

          console.log('tick processed');
        }
      }

      let newTick = now - ((ticksPassed % 1) * tickDuration);
      let timePlayed = (now - pInfo.startDate) / 1000;

      //update after ticks calculated
      setPlayerInfo({...pInfo, 
        lastTick: newTick, 
        timePlayed: timePlayed});

    }, tickCheck);

    return () => clearTimeout(interval);
  })

  console.log(playerInfo.lastTick)

  return (
    <div className="App">
      <header className="App-header">
        <div>Seconds: {playerInfo.timePlayed.toFixed()}</div>
        <div>Money: ${playerInfo.dollars.toFixed(2)}</div>
        <div>Renown: {playerInfo.renown.toFixed(2)}</div>
        <div>Technique: {playerInfo.technique.toFixed(3)}</div>
        <button onClick={() => practice(playerInfo)}>Practice</button>
      </header>

    </div>
  );
}

export default App;
