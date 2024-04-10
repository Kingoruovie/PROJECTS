/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  darkMode: 'selector',
  content: [
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'lime-green': 'hsl(163, 72%, 41%)',
        'bright-red': 'hsl(356, 69%, 56%)',
        'facebook': 'hsl(208, 92%, 53%)',
        'twitter': 'hsl(203, 89%, 53%)',
        'instagram-from': 'hsl(37, 97%, 70%)',
        'instagram-to': 'hsl(329, 70%, 58%)',
        'youtube': 'hsl(348, 97%, 39%)',
        'dark-toggle-from': 'hsl(210, 78%, 56%)',
        'dark-toggle-to': 'hsl(146, 68%, 55%)',
        'light-toggle': 'hsl(230, 22%, 74%)',
        'dark-bg-very-dark-blue': 'hsl(230, 17%, 14%)',
        'dark-top-bg-very-dark-blue': 'hsl(232, 19%, 15%)',
        'dark-card-dark-desaturated-blue': 'hsl(228, 28%, 20%)',
        'dark-text-desaturated-blue': 'hsl(228, 34%, 66%)',
        'light-top-bg-very-pale-blue': 'hsl(225, 100%, 98%)',
        'light-card-light-grayish-blue': 'hsl(227, 47%, 96%)',
        'light-text-dark-grayish-blue': 'hsl(228, 12%, 44%)',
        'light-text-very-dark-blue': 'hsl(230, 17%, 14%)',
      },

      fontFamily : {
        'body': ['Inter', ...defaultTheme.fontFamily.sans,]
      }
    },
  },
  plugins: [],
}

