/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        gradientFrom: "hsl(6, 100%, 80%)",
        gradientTo: "hsl(335, 100%, 65%)",
        paleBlue: "hsl(243, 100%, 93%)",
        grayishBlue: "hsl(229, 7%, 55%)",
        darkBlue: "hsl(228, 56%, 26%)",
        veryDarkBlue: "hsl(229, 57%, 11%)"
      },

      fontFamily: {
        body: ["Raleway", "sans-serif"],
      },

      backgroundImage: {
        mobile: "url('images/bg-mobile.png')",
        desktop: "url('images/bg-desktop.png')"
      }
    },
  },
  plugins: [],
}

