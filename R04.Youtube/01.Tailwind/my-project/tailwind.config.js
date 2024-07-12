/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bluejs: "#1fb6ff",
                redjs: "#dc2626",
                greenjs: {
                    100: "#d1fae5",
                    200: "#0d9488",
                },
            },
            spacing: {
                "8xl": "96rem",
                "9xl": "128rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
    plugins: [],
};
