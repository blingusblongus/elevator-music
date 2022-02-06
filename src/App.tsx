import './App.css';
import { useState, useEffect } from 'react';
import { PlayerInfo } from './models/PlayerInfo';
import busk from './functions/busk';
import techDecay from './functions/techDecay';
import practice from './functions/practice';
import GAME from './_gameConfig/gameConfig';
import Counters from './components/Counters/Counters';

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

  let activeTask = playerInfo.activity;

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
        activity: activeTask,
      });

    }, GAME.tick.rate);

    return () => clearTimeout(interval);
  })

  const startBusk = (): void => {
    playerInfo.fns.push({ fn: busk, args: [] });
    let removeIndex = playerInfo.fns.findIndex(f => f.fn === practice)
    playerInfo.fns.splice(removeIndex, 1);
    activeTask = 'Busking'
    playerInfo.buskingLog = [];
  }

  const startPractice = (): void => {
    playerInfo.fns.push({ fn: practice, args: [] });
    let removeIndex = playerInfo.fns.findIndex(f => f.fn === busk)
    playerInfo.fns.splice(removeIndex, 1);
    activeTask = 'Practicing'
    playerInfo.buskingLog = [];
  }

  return (
    <div className="App">
      <header className="App-header">
        <Counters playerInfo={playerInfo} activeTask={activeTask} />
        <div className="action-container">
          <button
            onClick={startPractice}
            style={activeTask === 'Practicing' ? styles.activeBtn : {}}>
            Practice
          </button>
          <button
            onClick={startBusk}
            style={activeTask === 'Busking' ? styles.activeBtn : {}}>
            Busk
          </button>
        </div>

        <div className='counter-notification'>Current Activity: {activeTask}</div>

      </header>

    </div>
  );
}

const styles = {
  activeBtn: {
    color: 'green',
    border: '2px solid green',
  }
}

export default App;
