/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {

    extend: {

      colors: {
        slate: colors.slate,
        emerald: colors.emerald,
        indigo: colors.indigo,

      }
    }
  },
  plugins: [],

}
