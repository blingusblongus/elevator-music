import './App.css';
import { useState, useEffect, useReducer } from 'react';
// import busk from './functions/busk';
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

  const countSecond = () => {
    setSeconds(seconds => seconds + 1);
  }

  const busk = (...args: unknown[]) => {
    let earnSuccess = Math.random() > .8;
    if(!earnSuccess) return;

    let money = playerInfo.dollars;
    let moneyEarned = Math.round(Math.random() * playerInfo.renown * 100) / 100;
    money += moneyEarned;
    console.log(moneyEarned)
    console.log(money);
    setPlayerInfo({...playerInfo, dollars: money});
  }


  let fns: Counter[] = [{fn: countSecond, args:[]}, {fn: busk, args:[]}];

  useEffect(() => {
    const interval = setInterval(() => {
      fns.forEach(counter => counter.fn(...counter.args))
    }, 1000);
    
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>Seconds: {seconds}</div>
        <div>Money: ${playerInfo.dollars.toFixed(2)}</div>
        <div>Renown: {playerInfo.renown.toFixed(2)}</div>
      </header>

    </div>
  );
}

export default App;
