/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#39ff14",
        primaryDark: "#02042a",
      },
    },
  },
  plugins: [],
};
