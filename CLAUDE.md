# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Pomodoro timer application built with React 19, TypeScript, and Vite. The project uses SWC for fast compilation and Tailwind CSS v4 for styling.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Type check and build for production
- `npm run lint` - Run ESLint
- `npm preview` - Preview production build

## Architecture

### Project Structure

```
src/
├── features/          # Feature-based organization
│   └── pomodoro/     # Pomodoro feature module
│       ├── components/      # Feature components
│       ├── contexts/        # State management (Context API)
│       ├── hooks/          # Custom hooks
│       ├── pomodoro.logic.ts   # Pure business logic functions
│       └── pomodoro.types.ts   # Type definitions
├── pages/            # Page components (route handlers)
├── styles/           # Global styles
└── main.tsx          # App entry point with router setup
```

### Key Architectural Patterns

**Feature-Based Organization**: Code is organized by feature (e.g., `features/pomodoro/`) rather than by technical layer. Each feature contains its own components, logic, and types.

**Component Export Pattern**: Feature components use a barrel export pattern via `index.ts` files to simplify imports. Example: `features/pomodoro/components/index.ts` exports `TimerDisplay` and `TimerControls`.

**Routing**: Uses React Router v7 with `createBrowserRouter`. Routes are defined in `main.tsx`. The router is configured with route objects containing `path` and `element` properties.

**Separation of Concerns for State and Logic**:

Each feature should separate concerns between state management, business logic, and component API:

- **`/contexts/`** - React Context for state management
  - Holds application state (timer state, settings)
  - Provides state to components via Context Provider
  - Manages side effects (intervals, timer ticking with useEffect)
  - Example: `PomodoroContext.tsx` with Provider and useReducer/useState

- **`pomodoro.logic.ts`** - Pure business logic functions
  - Time calculations and formatting (no state, no side effects)
  - State transition rules and timer duration calculations
  - Easy to unit test (pure functions)
  - Example: `calculateTimeRemaining()`, `formatTime()`, `getNextPhase()`

- **`/hooks/`** - Custom hooks for component API
  - Consumer hooks that wrap context access for cleaner component code
  - Example: `usePomodoro.ts` returns `{ state, start, pause, reset }`

This separation keeps code testable, maintainable, and follows React best practices.

### Type System

The project uses TypeScript with separate configurations:
- `tsconfig.app.json` - Application code configuration
- `tsconfig.node.json` - Build tooling configuration
- `tsconfig.json` - Project references (composite config)

Key types are defined in feature-specific `.types.ts` files (e.g., `pomodoro.types.ts` defines `TimerState`, `PomodoroSettings`, `PomodoroState`).

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Global styles in `src/styles/globals.css`
- Custom class names follow pattern: `timer-*`, `time-*` for timer-related components

## Important Notes

- Uses React 19 with SWC (not Babel) for Fast Refresh
- ESLint configured for flat config format with TypeScript, React Hooks, and React Refresh rules
- The React Compiler is not compatible with SWC (see README)
