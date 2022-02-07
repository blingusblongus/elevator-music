import React from 'react';
import { PlayerInfo } from '../../models/PlayerInfo';
import busk from '../../functions/busk';
import practice from '../../functions/practice';

interface Props {
    playerInfo: PlayerInfo;
    activeTask: string;
}

const Activity: React.FC<Props> = ({ playerInfo, activeTask }): JSX.Element => {
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

    return <div>
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
    </div>;
};

const styles = {
    activeBtn: {
        color: 'green',
        border: '2px solid green',
    }
}

export default Activity;

