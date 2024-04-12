/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        strongCyan: "hsl(171, 66%, 44%)",
        lightBlue: "hsl(233, 100%, 69%)",
        darkGrayishBlue: "hsl(210, 10%, 33%)",
        grayishBlue: "hsl(201, 11%, 66%)",
      },

      fontFamily: {
        body: ["Bai Jamjuree", ...defaultTheme.fontFamily.sans]
      },

      backgroundImage: {
        "mobile": "url('images/bg-header-mobile.png')",
        "desktop": "url('images/bg-header-desktop.png')"
      }
    },
  },
  plugins: [],
}

