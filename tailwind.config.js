/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      "display": "Karla",
      "body": "Inconsolata"
    },
    extend: {
      colors: {
        primary: "#92C7CF"
      },
    },
  },
  plugins: [],
}

