/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#0B001A",
      secondary: "#C1C0FF",
      accent: "#CBFFEC",
    },
    extend: {
      fontFamily: {
         'poppins': ['Poppins'],
      }
   }
  },
  plugins: [],
}