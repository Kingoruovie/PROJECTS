/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Open Sans", ...defaultTheme.fontFamily.sans],
        display: ["Raleway", ...defaultTheme.fontFamily.sans]
      },

      colors: {
        veryDarkBlue: "hsl(243, 87%, 12%)",
        desaturatedBlue: "hsl(238, 22%, 44%)",
        brightBlue: "hsl(224, 93%, 58%)",
        moderateCyan: "hsl(170, 45%, 43%)",
        lightGrayishBlue: "hsl(240, 75%, 98%)",
        lightGray: "hsl(0, 0%, 75%)"
      },

      backgroundImage: {
        mobile: "url('images/bg-curve-mobile.svg')",
        desktop: "url('images/bg-curve-desktop.svg')"
      }
    },
  },
  plugins: [],
}

