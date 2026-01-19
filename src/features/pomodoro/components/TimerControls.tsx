import { usePomodoro } from '../hooks/usePomodoro';

export default function TimerControls() {
    const { start, pause, reset, skip, state } = usePomodoro();
    return (
        <div className="timer-buttons">
            <button onClick={reset}>Reset</button>
            {state.status === 'running' ? (
                <button onClick={pause} className="timer-pause-button">
                    Pause
                </button>
            ) : (
                <button onClick={start} className="timer-start-button">
                    {state.status === 'paused' ? 'Resume' : 'Start'}
                </button>
            )}
            <button onClick={skip}>Skip</button>
        </div>
    );
}
