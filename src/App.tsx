import './App.css';
import { useState, useEffect } from 'react';
import { PlayerInfo } from './models/PlayerInfo';
import busk from './functions/busk';
import techDecay from './functions/techDecay';
import practice from './functions/practice';
import GAME from './_gameConfig/gameConfig';
import Counters from './components/Counters/Counters';
import Activity from './components/Activity/Activity';

function App() {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    dollars: 0,
    renown: 1,
    technique: 1,
    startDate: Date.now(),
    lastTick: Date.now(),
    timePlayed: 0,
    practiceLog: [],
    maxTech: 1,
    buskingLog: [],
    fns: [
      { fn: techDecay, args: [] },
      { fn: busk, args: [] }
    ],
    activity: 'None',
  });

  // Tick
  useEffect(() => {
    const interval = setTimeout(() => {
      let pInfo = playerInfo;
      let now = Date.now();
      let timePassed = now - playerInfo.lastTick;
      let ticksPassed = timePassed / GAME.tick.duration;
      let newTick = now - ((ticksPassed % 1) * GAME.tick.duration);
      let timePlayed = (now - pInfo.startDate) / 1000;
      let simTime = pInfo.lastTick;

      if (ticksPassed > 1) {
        for (let i = 1; i < ticksPassed; i++) {
          // pass playerInfo through all the counter functions
          pInfo = pInfo.fns.reduce((p: PlayerInfo, counter) => {
            return p = counter.fn(p, ...counter.args);
          }, pInfo);

          let trimIndex = pInfo.practiceLog.findIndex(l => now - l > GAME.techDecay.after);
          if (trimIndex !== -1) {
            let plog = pInfo.practiceLog;
            plog.splice(trimIndex, trimIndex + 1);
          }
          simTime += GAME.tick.duration;
        }
      }

      //update after ticks calculated
      setPlayerInfo({
        ...pInfo,
        lastTick: newTick,
        timePlayed: timePlayed,
        maxTech: Math.max(pInfo.technique, pInfo.maxTech),
        activity: playerInfo.activity,
      });

    }, GAME.tick.rate);

    return () => clearTimeout(interval);
  })

  return (
    <div className="App">
      <header className="App-header">
        <Counters playerInfo={playerInfo} />
        <Activity playerInfo={playerInfo} />
      </header>
    </div>
  );
}

export default App;