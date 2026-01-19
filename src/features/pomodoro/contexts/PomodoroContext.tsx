/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer, type ReactNode } from 'react';
import type {
    PomodoroMode,
    PomodoroSettings,
    PomodoroState,
} from '../pomodoro.types';
import { DEFAULT_POMODORO_SETTINGS } from '../constants';
import {
    calculateNumberOfSessions,
    calculateRemainingTime,
    calculateSessionsCompleted,
    getDurationForMode,
    getNextMode,
} from '../pomodoro.logic';

interface PomodoroContextValue {
    state: PomodoroState;
    settings: PomodoroSettings;
    start: () => void;
    pause: () => void;
    reset: () => void;
    skip: () => void;
    changeMode: (mode: PomodoroMode) => void;
}

export const PomodoroContext = createContext<PomodoroContextValue | undefined>(
    undefined,
);

const initialPomodoroState: PomodoroState = {
    status: 'idle',
    mode: 'work',
    duration: DEFAULT_POMODORO_SETTINGS.workDuration * 60 * 1000, // default to 25 minutes
    sessionsCompleted: 0,
    startedAt: null,
    pausedAt: null,
    accumulatedPause: 0,
    numberOfSessions: 1,
};

type PomodoroAction =
    | { type: 'START' }
    | { type: 'PAUSE' }
    | { type: 'RESET' }
    | { type: 'SKIP' }
    | { type: 'CHANGE_MODE'; mode: PomodoroMode }
    | { type: 'TICK' }
    | { type: 'COMPLETE' };

function pomodoroReducer(
    state: PomodoroState,
    action: PomodoroAction,
): PomodoroState {
    switch (action.type) {
        case 'START':
            if (state.status === 'idle' || state.status === 'completed') {
                console.log('Starting from idle or completed');
                return {
                    ...state,
                    status: 'running',
                    startedAt: Date.now(),
                    accumulatedPause: 0,
                    pausedAt: null,
                };
            }
            if (state.status === 'paused') {
                console.log('Resuming from paused');
                return {
                    ...state,
                    status: 'running',
                    accumulatedPause:
                        state.accumulatedPause +
                        (Date.now() - (state.pausedAt || 0)),
                    pausedAt: null,
                };
            }
            return state;

        case 'PAUSE':
            if (state.status === 'running') {
                console.log('Pausing from running');
                return {
                    ...state,
                    status: 'paused',
                    pausedAt: Date.now(),
                };
            }
            return state;

        case 'RESET':
            console.log('Resetting timer');
            return initialPomodoroState;

        case 'SKIP': {
            console.log('Skipping to next phase');
            console.log(`Current mode: ${state.mode}`);
            const newSessionCompleted = calculateSessionsCompleted(state);
            const newNumberOfSessions = calculateNumberOfSessions(state);
            const nextMode = getNextMode(
                state.mode,
                newSessionCompleted,
                DEFAULT_POMODORO_SETTINGS.sessionsBeforeLongBreak,
            );
            console.log(`Next mode: ${nextMode}`);
            console.log(`Sessions completed: ${newSessionCompleted}`);
            console.log(
                `SessionBeforeLongBreak: ${DEFAULT_POMODORO_SETTINGS.sessionsBeforeLongBreak}`,
            );
            console.log(`Number of sessions: ${newNumberOfSessions}`);
            return {
                ...state,
                mode: nextMode,
                status: 'idle',
                duration: getDurationForMode(
                    nextMode,
                    DEFAULT_POMODORO_SETTINGS,
                ),
                sessionsCompleted: newSessionCompleted,
                numberOfSessions: newNumberOfSessions,
            };
        }

        case 'CHANGE_MODE':
            console.log(`Changing mode to ${action.mode}`);
            return {
                ...initialPomodoroState,
                mode: action.mode,
                duration: getDurationForMode(
                    action.mode,
                    DEFAULT_POMODORO_SETTINGS,
                ),
            };

        case 'COMPLETE': {
            console.log('Completing current session');
            const newSessionCompleted = calculateSessionsCompleted(state);
            const newNumberOfSessions = calculateNumberOfSessions(state);
            const nextMode = getNextMode(
                state.mode,
                newSessionCompleted,
                DEFAULT_POMODORO_SETTINGS.sessionsBeforeLongBreak,
            );
            return {
                ...state,
                status: 'completed',
                mode: nextMode,
                duration: getDurationForMode(
                    nextMode,
                    DEFAULT_POMODORO_SETTINGS,
                ),
                sessionsCompleted: newSessionCompleted,
                numberOfSessions: newNumberOfSessions,
            };
        }

        default:
            return state;
    }
}

export function PomodoroProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(pomodoroReducer, initialPomodoroState);

    useEffect(() => {
        if (state.status !== 'running') return;

        const interval = setInterval(() => {
            const remaining = calculateRemainingTime(state);

            if (remaining <= 0) {
                dispatch({ type: 'COMPLETE' });
            }
        }, 100);

        return () => clearInterval(interval);
    }, [state]);

    const start = () => {
        dispatch({ type: 'START' });
    };

    const pause = () => {
        dispatch({ type: 'PAUSE' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    const skip = () => {
        dispatch({ type: 'SKIP' });
    };

    const changeMode = (mode: PomodoroMode) => {
        dispatch({ type: 'CHANGE_MODE', mode });
    };

    return (
        <PomodoroContext.Provider
            value={{
                state,
                settings: DEFAULT_POMODORO_SETTINGS,
                start,
                pause,
                reset,
                skip,
                changeMode,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
}
