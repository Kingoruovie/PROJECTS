/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          'bg-main': 'hsl(222, 26%, 31%)',
          'bg-toggle-keypad': 'hsl(223, 31%, 20%)',
          'bg-screen': 'hsl(224, 36%, 15%)',
          'key-bg-1': 'hsl(225, 21%, 49%)',
          'key-shadow-1': 'hsl(224, 28%, 35%)',
          'key-bg-2-toggle': 'hsl(6, 63%, 50%)',
          'key-shadow-2': 'hsl(6, 70%, 34%)',
          'key-bg-3': 'hsl(30, 25%, 89%)',
          'key-shadow-3': 'hsl(28, 16%, 65%)',
          'text-color-1': ' hsl(0, 0%, 100%)',
          'text-color-2': 'hsl(221, 14%, 31%)'
        },
        light: {
          'bg-main': 'hsl(0, 0%, 90%)',
          'bg-toggle-keypad': 'hsl(0, 5%, 81%)',
          'bg-screen': 'hsl(0, 0%, 93%)',
          'key-bg-1': 'hsl(185, 42%, 37%)',
          'key-shadow-1': 'hsl(185, 58%, 25%)',
          'key-bg-2-toggle': 'hsl(25, 98%, 40%)',
          'key-shadow-2': 'hsl(25, 99%, 27%)',
          'key-bg-3': 'hsl(45, 7%, 89%)',
          'key-shadow-3': 'hsl(35, 11%, 61%)',
          'text-color-1': 'hsl(60, 10%, 19%)',
          'text-color-2': '  hsl(0, 0%, 100%)'
        },
        custom: {
          'bg-main': 'hsl(268, 75%, 9%)',
          'bg-toggle-keypad': 'hsl(268, 71%, 12%)',
          'bg-screen': 'hsl(268, 71%, 12%)',
          'key-bg-1': 'hsl(281, 89%, 26%)',
          'key-shadow-1': 'hsl(285, 91%, 52%)',
          'key-bg-2-toggle': 'hsl(176, 100%, 44%)',
          'key-shadow-2': 'hsl(177, 92%, 70%)',
          'key-bg-3': 'hsl(268, 47%, 21%)',
          'key-shadow-3': 'hsl(290, 70%, 36%)',
          'text-color-1': 'hsl(52, 100%, 62%)',
          'text-color-2': ' hsl(0, 0%, 100%)',
          'text-color-3': 'hsl(198, 20%, 13%)'
        }
      },
      fontFamily: {
        display: ['League Spartan', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        'dark-1': '0 8px 0 hsl(224, 28%, 35%)',
        'dark-2': '0 8px 0 hsl(6, 70%, 34%)',
        'dark-3': '0 8px 0 hsl(28, 16%, 65%)',
        'light-1': '0 8px 0 hsl(185, 58%, 25%)',
        'light-2': '0 8px 0 hsl(25, 99%, 27%)',
        'light-3': '0 8px 0 hsl(35, 11%, 61%)',
        'custom-1': '0 8px 0 hsl(285, 91%, 52%)',
        'custom-2': '0 8px 0 hsl(177, 92%, 70%)',
        'custom-3': '0 8px 0 hsl(290, 70%, 36%)'
      }
    },
  },
  plugins: [],
}

