/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#8f57fd',
        'brand-dark': '#0d0d0d',
      },
      fontFamily: {
        'sans': ['Muli', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
