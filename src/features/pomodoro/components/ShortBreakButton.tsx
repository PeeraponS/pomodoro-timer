import { usePomodoro } from '../hooks/usePomodoro';

export default function ShortBreakButton() {
    const { changeMode, state } = usePomodoro();
    return (
        <button
            onClick={() => changeMode('break')}
            className={`short-break-button menu-button ${state.mode === 'break' ? 'active' : ''}`}
        >
            Short Break
        </button>
    );
}
