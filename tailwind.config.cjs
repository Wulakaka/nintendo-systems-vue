/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        tick: 'move 10s linear var(--delay) infinite, 10s bigger ease-in-out var(--delay) infinite'
      },
      keyframes: {
        bigger: {
          '0%': {
            height: '5rem',
            width: '1.25rem',
          },
          '40%':{
            height: '5rem',
            background: '#4c76c3',
          },
          '50%': {
            height: '10rem',
            background: 'white'
          },
          '60%':{
            height: '1.25rem',
            background: '#4c76c3'
          },
          '75%': {
            height: '1.25rem',
            width: '1.25rem',
          },
          '100%': {
            height: '10rem',
            width: '10rem',
            'border-radius': '5rem'
          },
        },
        move: {
          '0%': {
            transform: 'translateX(25rem)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(-25rem)',
            opacity: '0'
          }
        },
        circle :{
          from: {
            transform: 'rotate(0)'
          },
          to:{
            transform: 'rotate(360deg)'
          }
        },
        z: {
          from:{
            transform: 'translateZ(var(--from))'
          },
          to:{
            transform: 'translateZ(var(--to))'
          }
        }
      }
    }
  },
  plugins: []
}
