/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--current-primary)',
                'primary-hover': 'var(--current-primary-hover)',
                'theme-bg': 'var(--current-bg)',
            },
        },
    },
    plugins: [],
};
