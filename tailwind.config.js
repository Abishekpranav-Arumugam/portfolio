/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['"Open Sans"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        bodyBg: '#f2f5f8',
        boxDark: '#1c1e20',
        pColor: '#838485',
      },
      boxShadow: {
        avatarText: '0 8px 26px 0 rgba(22, 24, 26, 0.11)',
        sectionBoxShadow: '0 8px 26px 0 rgba(22, 24, 26, 0.07)',
        sectionBoxShadowHover: '0 8px 32px 0 rgba(22, 24, 26, 0.11)',
        darkBox: '0 8px 26px 0 rgba(0, 0, 0, 0.3)',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      keyframes: {
        lineMove: {
          '0%': { top: '-80px' },
          '100%': { top: '100%' },
        },
        loaderLetter: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        bgLine: 'lineMove 8s linear infinite',
        loader: 'loaderLetter 1s linear infinite',
      },
    },
  },
  plugins: [],
}

