const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,css,scss}',
    './modals/**/*.{js,ts,jsx,tsx,css,scss}',
    './components/**/*.{js,ts,jsx,tsx,css,scss}',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.teal,
      },
    },
  },
  plugins: [],
};
