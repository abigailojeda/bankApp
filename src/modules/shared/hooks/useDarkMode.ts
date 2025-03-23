import { useEffect, useState } from 'react';

export const useDarkMode = (): { isDark: boolean; toggleDarkMode: () => void } => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return { isDark, toggleDarkMode: () => setIsDark(prev => !prev) };
};
