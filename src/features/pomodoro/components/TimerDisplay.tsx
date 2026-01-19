import { usePomodoro } from '../hooks/usePomodoro';
import { calculateRemainingTime, formatTime } from '../pomodoro.logic';
import { useEffect, useState } from 'react';

export default function TimerDisplay() {
    const { state } = usePomodoro();
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        if (state.status === 'running') {
            const interval = setInterval(() => {
                forceUpdate((n) => n + 1);
            }, 100);

            return () => clearInterval(interval);
        }
    }, [state.status]);

    const remaining = calculateRemainingTime(state);
    const displayTime = formatTime(remaining);

    return <div className="time-counter">{displayTime}</div>;
}
