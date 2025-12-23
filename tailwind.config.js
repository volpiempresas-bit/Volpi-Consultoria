/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#B91C1C',
          500: '#991B1B',
          600: '#7F1D1D',
        },
        graphite: {
          800: '#2C3E50',
          900: '#1A252F',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}