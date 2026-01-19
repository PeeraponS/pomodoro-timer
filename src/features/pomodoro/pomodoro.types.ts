export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface PomodoroSettings {
    workDuration: number; // in minutes
    breakDuration: number; // in minutes
    longBreakDuration: number; // in minutes
    sessionsBeforeLongBreak: number;
}

export type PomodoroState = {
    status: TimerState;
    mode: PomodoroMode;
    duration: number; // milliseconds
    sessionsCompleted: number;
    startedAt: number | null;
    pausedAt: number | null;
    accumulatedPause: number;
    numberOfSessions: number;
};

export type PomodoroMode = 'work' | 'break' | 'longBreak';
