/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "alata": ["Alata", "sans-serif"],
        "josefin-sans": ["Josefin Sans", "sans-serif"]
      },

      backgroundImage: {
        "mobile": "url('images/mobile/image-hero.jpg')",
        "desktop": "url('images/desktop/image-hero.jpg')"
      }
    },
  },
  plugins: [],
}

