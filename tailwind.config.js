/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'onyx-black': '#0A0A0A',
        'onyx-dark': '#121212',
        'onyx-gray': '#1E1E1E',
        'onyx-light': '#2A2A2A',
        'fire-red': '#FF3A00',
        'fire-orange': '#FF7700',
        'fire-yellow': '#FFAA00',
        'accent-purple': '#9D4EDD',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flame-pulse': 'flamePulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flamePulse: {
          '0%, 100%': { filter: 'brightness(1) drop-shadow(0 0 8px rgba(255, 58, 0, 0.5))' },
          '50%': { filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255, 58, 0, 0.8))' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};