import type {
    PomodoroMode,
    PomodoroSettings,
    PomodoroState,
} from './pomodoro.types';

export function calculateRemainingTime(state: PomodoroState) {
    if (state.status === 'idle' || !state.startedAt) {
        return state.duration;
    }

    if (state.status === 'paused' && state.pausedAt) {
        const elapsed =
            state.pausedAt - state.startedAt - state.accumulatedPause;
        return Math.max(0, state.duration - elapsed);
    }

    if (state.status === 'running') {
        const elapsed = Date.now() - state.startedAt - state.accumulatedPause;
        return Math.max(0, state.duration - elapsed);
    }

    return state.duration;
}

export function formatTime(ms: number): string {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getDurationForMode(
    mode: PomodoroMode,
    settings: PomodoroSettings,
) {
    switch (mode) {
        case 'work':
            return settings.workDuration * 60 * 1000;
        case 'break':
            return settings.breakDuration * 60 * 1000;
        case 'longBreak':
            return settings.longBreakDuration * 60 * 1000;
        default:
            return settings.workDuration * 60 * 1000;
    }
}

export function getNextMode(
    currentMode: PomodoroMode,
    sessionsCompleted: number,
    sessionsBeforeLongBreak: number,
): PomodoroMode {
    if (currentMode === 'work') {
        if (sessionsCompleted % sessionsBeforeLongBreak === 0) {
            return 'longBreak';
        }
        return 'break';
    }
    return 'work';
}

export function calculateSessionsCompleted(state: PomodoroState): number {
    if (state.mode === 'work') {
        return state.sessionsCompleted + 1;
    }
    return state.sessionsCompleted;
}

export function calculateNumberOfSessions(state: PomodoroState): number {
    if (state.mode === 'break' || state.mode === 'longBreak') {
        return state.numberOfSessions + 1;
    }
    return state.numberOfSessions;
}
