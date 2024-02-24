/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vuejs: {
          100: "#49e659",
          200: "#43e659",
        },
      },
      fontSize: {},
    },
  },
  plugins: [],
};
