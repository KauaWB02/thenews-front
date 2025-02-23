/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik:  ['Montserrat', 'serif']
      },

      colors: {
        amarelo: '#FFCE04',
        'black-700': '#030712',
        'black-500': '#10131e',
        marrom: '#240E0B',
        cinza: '#615A5A',
        branco: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
