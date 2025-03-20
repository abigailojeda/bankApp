import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { useDarkMode } from '../hooks/useDarkMode';
describe('useDarkMode', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');
    });

    it('initializes isDark based on window.matchMedia when localStorage is empty', () => {
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        const { result } = renderHook(() => useDarkMode());
        // If window.matchMedia returns true, isDark must be true
        expect(result.current.isDark).toBe(true);
    });

    it('initializes isDark as false when localStorage is "light"', () => {
        localStorage.setItem('theme', 'light');
        const { result } = renderHook(() => useDarkMode());
        expect(result.current.isDark).toBe(false);
    });

    it('toggle dark mode when localStorage & the document class is updated', () => {
        localStorage.setItem('theme', 'light');
        const { result } = renderHook(() => useDarkMode());

        expect(result.current.isDark).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        act(() => {
            result.current.toggleDarkMode();
        });

        expect(result.current.isDark).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            result.current.toggleDarkMode();
        });

        expect(result.current.isDark).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
});
