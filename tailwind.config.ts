import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
    },
    extend: {
      backgroundImage: {
        // Graph-paper grid; pair with a background size, e.g. bg-[length:2rem_2rem]
        grid: 'linear-gradient(to right, rgb(17 138 178 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(17 138 178 / 0.12) 1px, transparent 1px)',
      },
      colors: {
        // #FF933E — warm accent. Decorative use only (fills, borders, lines);
        // use 700+ if it ever needs to be text on white.
        accent: {
          50: '#FFF6EE',
          100: '#FFEAD7',
          200: '#FFD3AE',
          300: '#FFB57A',
          400: '#FF933E',
          DEFAULT: '#FF933E',
          500: '#F77A1C',
          600: '#E06010',
          700: '#B9490F',
          800: '#933B14',
          900: '#773314',
          950: '#40180A',
        },
        // #118AB2 — cool primary. 700+ for small text on white (AA contrast).
        primary: {
          50: '#EEF9FC',
          100: '#D5F0F8',
          200: '#AFE2F1',
          300: '#78CDE6',
          400: '#3BB1D4',
          500: '#1A9BC4',
          600: '#118AB2',
          DEFAULT: '#118AB2',
          700: '#106F90',
          800: '#135C76',
          900: '#154D63',
          950: '#0B3445',
        },
      },
    },
  },
  content: [],
  plugins: [],
}
