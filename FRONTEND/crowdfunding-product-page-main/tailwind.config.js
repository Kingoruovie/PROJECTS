/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}"
  ],
  theme: {
    fontFamily: {
      "body": ["Commissioner", "sans-serif"]
    },
    extend: {
      backgroundImage: {
        "mobile": "url('images/image-hero-mobile.jpg')",
        "desktop": "url('images/image-hero-desktop.jpg')",
        "dollar": "url('images/icon_dollar.svg')"
      },
      transitionProperty: {
        height: "height",
      },
      colors: {
        cyan: "hsl(176, 50%, 47%)",
        darkCyan: "hsl(176, 72%, 28%)",
        darkGray: "hsl(0, 0%, 48%)"
      }
    },
  },
  plugins: [],
}

