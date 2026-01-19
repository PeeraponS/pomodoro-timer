import { usePomodoro } from '../hooks/usePomodoro';

export default function PomodoroButton() {
    const { changeMode, state } = usePomodoro();
    return (
        <button
            onClick={() => changeMode('work')}
            className={`pomodoro-button menu-button ${state.mode === 'work' ? 'active' : ''}`}
        >
            Pomodoro
        </button>
    );
}
