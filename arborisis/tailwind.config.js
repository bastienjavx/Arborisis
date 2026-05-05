import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'system-ui', ...defaultTheme.fontFamily.sans],
                display: ['Cormorant', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                arbor: {
                    night:    '#0B1220',
                    deep:     '#111827',
                    deeper:   '#0d1117',
                    moss:     '#4A6741',
                    'moss-light': '#5a7d4f',
                    emerald:  '#34D399',
                    'emerald-dark': '#10B981',
                    sage:     '#8FA68E',
                    cream:    '#F3F0E7',
                    'cream-dark': '#E8E4D9',
                    glass:    'rgba(255,255,255,0.05)',
                    'glass-border': 'rgba(255,255,255,0.1)',
                    amber:    '#D4A574',
                    'amber-glow': '#C9842B',
                    copper:   '#B87333',
                    charcoal: '#1a1f2e',
                    fog:      '#2a3142',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(74, 103, 65, 0.3), transparent)',
                'studio-gradient': 'linear-gradient(180deg, #0B1220 0%, #111827 50%, #0d1117 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
                'wave': 'wave 1.2s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'reel-spin': 'reelSpin 8s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                wave: {
                    '0%, 100%': { transform: 'scaleY(0.3)' },
                    '50%': { transform: 'scaleY(1)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                reelSpin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },

    plugins: [forms],
};
