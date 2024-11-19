/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'grow-width': 'grow 0.3s ease-in-out forwards'
      },
      keyframes: {
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      }
    },
  },
  // darkMode: "class",
  plugins: [nextui()],
}