import React from 'react';
import { PlayerInfo } from '../../models/PlayerInfo';
import busk from '../../functions/busk';
import practice from '../../functions/practice';

interface Props {
    playerInfo: PlayerInfo;
}

const Activity: React.FC<Props> = ({ playerInfo }): JSX.Element => {
    const startBusk = (): void => {
        playerInfo.fns.push({ fn: busk, args: [] });
        let removeIndex = playerInfo.fns.findIndex(f => f.fn === practice)
        playerInfo.fns.splice(removeIndex, 1);
        playerInfo.activity = 'Busking'
        playerInfo.buskingLog = [];
    }

    const startPractice = (): void => {
        playerInfo.fns.push({ fn: practice, args: [] });
        let removeIndex = playerInfo.fns.findIndex(f => f.fn === busk)
        playerInfo.fns.splice(removeIndex, 1);
        playerInfo.activity = 'Practicing'
        playerInfo.buskingLog = [];
    }

    return <div>
        <div className="action-container">
            <button
                onClick={startPractice}
                style={playerInfo.activity === 'Practicing' ? styles.activeBtn : {}}>
                Practice
            </button>
            <button
                onClick={startBusk}
                style={playerInfo.activity === 'Busking' ? styles.activeBtn : {}}>
                Busk
            </button>
        </div>

        <div className='counter-notification'>Current Activity: {playerInfo.activity}</div>
    </div>;
};

const styles = {
    activeBtn: {
        color: 'green',
        border: '2px solid green',
    }
}

export default Activity;

