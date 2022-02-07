import React from 'react';
import { PlayerInfo } from '../../models/PlayerInfo';
import GAME from '../../_gameConfig/gameConfig'

interface Props {
    playerInfo: PlayerInfo;
}

const Counters: React.FC<Props> = ({ playerInfo }): JSX.Element => {

    let buskSum = playerInfo.buskingLog.reduce((sum, el) => sum += el, 0.00);
    let buskAvg = playerInfo.buskingLog.length > 0
        ? buskSum / playerInfo.buskingLog.length
        : 0.00;
    return <div>
        <div>Seconds: {playerInfo.timePlayed.toFixed()}</div>

        <div className="counter-container">
            <span>
                Money: ${playerInfo.dollars.toFixed(2)}
            </span>
            <span className='counter-notification'>
                + ${playerInfo.buskingLog.length > 0 ?
                    buskAvg.toFixed(2)
                    :
                    '0.00'}/sec     {playerInfo.activity === 'Busking' && `( + $${buskSum.toFixed(2)} )`}

            </span>
        </div>

        <div>Renown: {playerInfo.renown.toFixed(2)}</div>

        <div className="counter-container">
            <span>Technique: {(playerInfo.technique).toFixed(3)}</span>
            {playerInfo.practiceLog.length > GAME.practiceFatigue
                && <span className='counter-notification'>Practice fatigue...</span>}
            {playerInfo.practiceLog.length === 0
                && <span className='counter-notification'>
                    Haven't practiced in a while...
                </span>}
        </div>

    </div>;
};

export default Counters;