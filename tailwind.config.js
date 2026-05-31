/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0', // page background — warm off-white
        surface: '#FFFFFF', // cards / inputs
        ink: '#322F2A', // primary text — warm near-black
        muted: '#8C887F', // secondary text
        line: '#E4E0D7', // hairline borders
        accent: '#8C2F2F', // muted brick red — used sparingly
        sub: '#EFEBE3', // subtle fill (image tiles)
      },
      fontFamily: {
        sans: [
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          '"Hiragino Kaku Gothic ProN"',
          'Meiryo',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};
