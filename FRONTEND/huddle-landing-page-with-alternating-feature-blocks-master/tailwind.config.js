/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        pinkBtn: "hsl(322, 100%, 66%)",
        veryPaleBlue: "hsl(193, 100%, 96%)",
        veryDarkCyan: "hsl(192, 100%, 9%)",
        grayishBlue: "hsl(208, 11%, 55%)"
      },

      backgroundImage: {
        mobile: "url('images/bg-hero-mobile.svg')",
        desktop: "url('images/bg-hero-desktop.svg')"
      },

      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        openSans: ["Open Sans", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

