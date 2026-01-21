import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    // createBrowserRouter, // For Vercel
    createHashRouter, // For GitHub Pages
    RouterProvider,
} from 'react-router-dom';
// import global style
import './styles/globals.css';
// import pages
import PomodoroPage from './pages/PomodoroPage';
import { PomodoroProvider } from './features/pomodoro/contexts/PomodoroContext';

/* For Vercel */
// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <PomodoroPage />,
//     },
//     // Add more routes here:
//     // {
//     //     path: '/settings',
//     //     element: <SettingsPage />,
//     // },
// ]);

/* For GitHub Pages */
const router = createHashRouter([
    {
        path: '/',
        element: <PomodoroPage />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PomodoroProvider>
            <RouterProvider router={router} />
        </PomodoroProvider>
    </StrictMode>,
);
