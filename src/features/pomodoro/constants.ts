import type { PomodoroSettings } from './pomodoro.types';

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
    workDuration: 25, // 25 minutes
    breakDuration: 5, // 5 minutes
    longBreakDuration: 15, // 15 minutes
    sessionsBeforeLongBreak: 4, // 4 sessions
};
