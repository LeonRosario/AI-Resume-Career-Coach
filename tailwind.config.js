/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        fustat: ['Fustat', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#60B1FF',
          DEFAULT: '#0084FF',
          orange: '#FF801E',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
