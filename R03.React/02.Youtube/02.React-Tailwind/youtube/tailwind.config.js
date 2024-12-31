/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                "custom-primary": "#243cff",
                "custom-secondaty": "#0d1b3e",
            },
            spacing: {
                42: "170px",
            },
        },
    },
    plugins: [],
};
