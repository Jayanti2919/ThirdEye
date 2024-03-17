/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#0E0C0D",
      secondary: "#F1EFEF",
      tertiary: "#353B64",
      accent: "#9D9FE2",
    },
    extend: {
      fontFamily: {
         'poppins': ['Poppins'],
      },
      invert: ['responsive', 'hover', 'focus', 'active', 'group-hover']
   }
  },
  plugins: [],
}