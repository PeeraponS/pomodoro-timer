import { usePomodoro } from '../hooks/usePomodoro';

export default function LongBreakButton() {
    const { changeMode, state } = usePomodoro();
    return (
        <button
            onClick={() => changeMode('longBreak')}
            className={`long-break-button menu-button ${state.mode === 'longBreak' ? 'active' : ''}`}
        >
            Long Break
        </button>
    );
}
