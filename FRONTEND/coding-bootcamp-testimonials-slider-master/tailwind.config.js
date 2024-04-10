/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(240, 38%, 20%)",
        grayishBlue: "hsl(240, 18%, 77%)"
      },

      fontFamily: {
        body: ["Inter", "sans-serif"]
      },

      backgroundImage: {
        "pattern-bg": "url('images/pattern-bg.svg')",
        "pattern-curve": "url('images/pattern-curve.svg')",
        "pattern-quotes": "url('images/pattern-quotes.svg')"
      }
    },
  },
  plugins: [],
}

