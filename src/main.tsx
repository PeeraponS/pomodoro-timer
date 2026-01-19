import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import global style
import './styles/globals.css';
// import pages
import PomodoroPage from './pages/PomodoroPage';
import { PomodoroProvider } from './features/pomodoro/contexts/PomodoroContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PomodoroPage />,
    },
    // Add more routes here:
    // {
    //     path: '/settings',
    //     element: <SettingsPage />,
    // },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PomodoroProvider>
            <RouterProvider router={router} />
        </PomodoroProvider>
    </StrictMode>,
);
