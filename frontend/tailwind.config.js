/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      padding: {
        default: "1rem",
        md: "2rem",
        lg: "10rem"
      },
    }
  },
  plugins: [],
}

