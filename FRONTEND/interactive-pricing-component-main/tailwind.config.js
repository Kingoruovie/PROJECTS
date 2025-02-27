/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "body": ["Manrope", "sans-serif"]
      },
      colors: {
        softCyan: "hsl(174, 77%, 80%)",
        strongCyan: "hsl(174, 86%, 45%)",
        lightGrayishRed: "hsl(14, 92%, 95%)",
        lightRed: "hsl(15, 100%, 70%)",
        paleBlue: "hsl(226, 100%, 87%)",
        veryPaleBlue: "hsl(230, 100%, 99%)",
        lightGrayishBlueEmpty: "hsl(224, 65%, 95%)",
        lightGrayishBlueToggle: "hsl(223, 50%, 87%)",
        grayishBlue: "hsl(225, 20%, 60%)",
        darkDesaturatedBlue: "hsl(227, 35%, 25%)"
      },
      backgroundImage: {
        "bg-pattern": "url('images/bg-pattern.svg')",
        "pattern-circles": "url('images/pattern-circles.svg')",
        "icon-slider": "url('images/icon-slider.svg')",
        "icon-check": "url('images/icon-check.svg')"
      }
    },
  },
  plugins: [],
}

