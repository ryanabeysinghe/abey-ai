/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customAqua: "#00FFFF", // Aqua
        customBlue: "#217bfe", // Blue
        customLightGray: "#ddd", // Light Gray
        customCinder: "#12101B", // Cinder
      },
    },
  },
  plugins: [],
}