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
        customCharade: "#2C2937", // Charade
        customGray: "#888888", // Gray
        customGallery: "#ECECEC", // Gallery
        customMidGray: "#605E68", // Mid Gray
      },
    },
  },
  plugins: [],
}