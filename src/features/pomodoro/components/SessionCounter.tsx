import { usePomodoro } from '../hooks/usePomodoro';

export default function SessionCounter() {
    const { state } = usePomodoro();

    return (
        <div className="session-counter">
            {`Session ${state.numberOfSessions}`}
        </div>
    );
}
