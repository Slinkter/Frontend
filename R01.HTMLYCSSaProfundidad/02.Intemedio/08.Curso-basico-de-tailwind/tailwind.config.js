/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#CC2D4A",
      secondary: "#8FA206",
      tertiary: "#61AEC9",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#CC2D4A",
      secondary: "#8FA206",
      tertiary: "#61AEC9",
    }),

    extend: {
      backgroundImage: {
        sanFrancisco:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/sanFrancisco.jpg')",
        sanFranciscoDesktop:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/sanFranciscoDesktop.jpg')",
        yosemite:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/yosemite.jpg')",
        LA: "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/LA.jpg')",
        seattle:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/seattle.jpg')",
        new_york:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/new_york.jpg')",
        norway:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/norway.jpg')",
        sydney:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/sydney.jpg')",
        miami:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/miami.jpg')",
        switzerland:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/switzerland.jpg')",
        bali: "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/bali.jpg')",
        chicago:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/chicago.jpg')",
        europe:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/europe.jpg')",
        iceland:
          "url('https://raw.githubusercontent.com/platzi/PlatziTravel/main/public/img/iceland.jpg')",
      },
    },
  },
  variants: {
    with: ["responsive", "hover", "focus"],
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
