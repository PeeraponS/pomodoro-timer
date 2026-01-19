import LongBreakButton from './LongBreakButton';
import PomodoroButton from './PomodoroButton';
import ShortBreakButton from './ShortBreakButton';

export default function TimerMenu() {
    return (
        <div className="timer-menu">
            <PomodoroButton />
            <ShortBreakButton />
            <LongBreakButton />
        </div>
    );
}
