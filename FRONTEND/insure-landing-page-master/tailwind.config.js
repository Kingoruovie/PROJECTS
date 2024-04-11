/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        darkViolet: "hsl(256, 26%, 20%)",
        grayishBlue: "hsl(216, 30%, 68%)",
        veryDarkViolet: "hsl(270, 9%, 17%)",
        darkGrayishViolet: "hsl(273, 4%, 51%)",
        veryLightGray: "hsl(0, 0%, 98%)"
      },

      fontFamily: {
        "body": ["DM Serif Display", ...defaultTheme.fontFamily.serif],
        "display": ["Karla", ...defaultTheme.fontFamily.sans]
      },

      backgroundImage: {
        "pattern-footer-desktop": "url('images/bg-pattern-footer-desktop.svg')",
        "pattern-footer-mobile": "url('images/bg-pattern-footer-mobile.svg')",
        "pattern-work-desktop": "url('images/bg-pattern-how-we-work-desktop.svg')",
        "pattern-work-mobile": "url('images/bg-pattern-how-we-work-mobile.svg')",
        // "pattern-intro-left-desktop": "url('images/bg-pattern-intro-left-desktop.svg')",
        // "pattern-intro-left-mobile": "url('images/bg-pattern-intro-left-mobile.svg')",
        // "pattern-intro-right-desktop": "url('images/bg-pattern-intro-right-desktop.svg')",
        // "pattern-intro-right-mobile": "url('images/bg-pattern-intro-right-mobile.svg')",
        "pattern-mobile-nav": "url('images/bg-pattern-mobile-nav.svg')",
        "image-intro-desktop": "url('images/image-intro-desktop.jpg')",
        "image-intro-mobile": "url('images/image-intro-mobile.jpg')"
      }
    },
  },
  plugins: [],
}

