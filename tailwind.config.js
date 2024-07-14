/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-dark" : '#00000080',
        "custom":'#8D8D1F'
      }
    },
  },
  plugins: [],
}

