/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage:{
        'conic': 'conic-gradient(from 0deg, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
}
