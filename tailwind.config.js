/** @type {import('tailwindcss').Config} */

export const content = ['./src/**/*.{ts,tsx}'];

export const theme = {
  screens: {
    sm: '500px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  extend: {
    width: {
      97.5: '24.375rem',
      100: '30rem',
    },
    height: {
      87.5: '21.275rem',
    },
    borderRadius: {
      '4xl': '1.25rem',
    },
    colors: {
      snow: '#FFFAFA',
      coralRed: '#FF4343',
      begonia: '#FF7171',
      taupeGray: '#878787',
      chineseBlack: '#14161A',
      gunmetal: '#2C313A',
      chineseBlackVoid: '#10131C',
    },
  },
};