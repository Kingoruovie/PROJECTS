/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        'bg-desktop-dark': "url('src/assets/bg-desktop-dark.jpg')",
        'bg-desktop-light': "url('src/assets/bg-desktop-light.jpg')",
        'bg-mobile-dark': "url('src/assets/bg-mobile-dark.jpg')",
        'bg-mobile-light': "url('src/assets/bg-mobile-light.jpg')",
      },
      content: {
        'link': 'url("./src/assets/icon-check.svg")'
      },
      colors: {
        'bright-blue': "hsl(220, 98%, 61%)",
        // Linear-gradient
        'gradient-1': "hsl(192, 100%, 67%)",
        'gradient-2': "hsl(280, 87%, 65%)",
        // Light theme
        'very-light-gray': "hsl(0, 0%, 98%)",
        'very-light-grayish-blue': "hsl(236, 33%, 92%)",
        'light-grayish-blue': "hsl(233, 11%, 84%)",
        'dark-grayish-blue': "hsl(236, 9%, 61%)",
        'very-dark-grayish-blue': "hsl(235, 19%, 35%)",
        // Dark theme
        'very-dark-blue': "hsl(235, 21%, 11%)",
        'very-dark-desat-blue': "hsl(235, 24%, 19%)",
        'light-grayish-blue-dark': "hsl(234, 39%, 85%)",
        'light-grayish-blue-hover': "hsl(236, 33%, 92%)",
        'dark-grayish-blue-dark': "hsl(234, 11%, 52%)",
        'very-dark-grayish-blue-dark-1': "hsl(233, 14%, 35%)",
        'very-dark-grayish-blue-dark-2': "hsl(237, 14%, 26%)"
      },
      fontFamily: {
        'sans': ['Josefin Sans', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
