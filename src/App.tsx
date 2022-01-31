import './App.css';
import { useState, useEffect } from 'react';
import { PlayerInfo } from './models/PlayerInfo';
import { Counter } from './models/Counter';
import busk from './functions/busk';
import techDecay from './functions/techDecay';
import practice from './functions/practice';

const tickCheck = 160;
const tickDuration = 1000;
const perSecond = 1000 / tickCheck; 

function App() {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    dollars: 0,
    renown: 1,
    technique: 1,
    startDate: Date.now(),
    lastTick: Date.now(),
    timePlayed: 0,
  });
  let dTechnique = 0;
  let practiceLog: number[] = [];
  let techInterval = 10000;

  let fns: Counter[] = [ 
    {fn: techDecay, args: [practiceLog]},
    {fn: busk, args:[]}
  ];

  useEffect(() => {
    const interval = setTimeout(() => {
      let pInfo = playerInfo;
      let now = Date.now();
      let timePassed = now - playerInfo.lastTick;
      let ticksPassed = timePassed / tickDuration;
      let newTick = now - ((ticksPassed % 1) * tickDuration);
      let timePlayed = (now - pInfo.startDate) / 1000;
      let simTime = now;

      if(ticksPassed > 1){
        for(let i=1; i<ticksPassed; i++){
          pInfo = fns.reduce((p: PlayerInfo, counter) => {

            return p = counter.fn(p, ...counter.args);
          }, pInfo);

          simTime += tickDuration;
        }
      }

      //update after ticks calculated
      setPlayerInfo({...pInfo, 
        technique: pInfo.technique + dTechnique,
        lastTick: newTick, 
        timePlayed: timePlayed});

    }, tickCheck);

    return () => clearTimeout(interval);
  })

  const handlePractice = () => {
    dTechnique = practice(dTechnique);
    practiceLog.push(Date.now());
  }

  console.log(playerInfo)

  return (
    <div className="App">
      <header className="App-header">
        <div>Seconds: {playerInfo.timePlayed.toFixed()}</div>
        <div>Money: ${playerInfo.dollars.toFixed(2)}</div>
        <div>Renown: {playerInfo.renown.toFixed(2)}</div>
        <div>Technique: {(playerInfo.technique + dTechnique).toFixed(3)}</div>
        <button onClick={handlePractice}>Practice</button>
      </header>

    </div>
  );
}

export default App;
