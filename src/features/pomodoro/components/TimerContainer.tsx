import { useEffect } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';
import PomodoroHeader from './PomodoroHeader';
import SessionCounter from './SessionCounter';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerMenu from './TimerMenu';

export default function TimerContainer() {
    const { state } = usePomodoro();

    // Set theme on body element
    useEffect(() => {
        document.body.setAttribute('data-theme', state.mode);
        console.log('Theme changed to:', state.mode);
    }, [state.mode]);

    return (
        <div className="timer-container">
            <PomodoroHeader />
            <TimerMenu />
            <TimerDisplay />
            <SessionCounter />
            <TimerControls />
        </div>
    );
}
