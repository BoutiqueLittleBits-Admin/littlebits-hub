/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          sage: '#5F7F73',
          mint: '#8FAE9A',
          coral: '#D7746B',
          blush: '#E8A3B3',
          cream: '#FAF8F5',
          gold: '#E9C36A',
          slate: '#5C7F9B',
        }
      }
    },
  },
  plugins: [],
}
