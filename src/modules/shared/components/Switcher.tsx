import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SwitcherProps } from '../types/Switcher.types';

export const Switcher: React.FC<SwitcherProps> = ({
    isDark,
    onToggle,
}) => {
    return (
        <div
            onClick={onToggle}
            className="relative w-15 h-8 cursor-pointer select-none"
        >
            <div className="absolute inset-0 bg-subtitle/30  rounded-full transition-colors" />

            <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center bg-subtitle dark:text-gray text-primary transition-transform ${isDark ? 'translate-x-[1.5rem]' : ''}`}
            >
                {isDark ? (
                    <MoonIcon width="16" height="16" />
                ) : (
                    <SunIcon width="16" height="16" />
                )}
            </div>
        </div>
    );
};
