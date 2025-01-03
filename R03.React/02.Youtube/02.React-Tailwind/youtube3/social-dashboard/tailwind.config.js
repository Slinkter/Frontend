/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                limeGreen: "hsl(163, 72%, 41%)",
                brightRed: "hsl(356, 69%, 56%)",
                facebook: "hsl(208, 92%, 53%)",
                twitter: "hsl(203, 89%, 53%)",
                instagram: {
                    from: "hsl(37, 97%, 70%)",
                    to: "hsl(329, 70%, 58%)",
                },
                youtube: "hsl(348, 97%, 39%)",
                darkTheme: {
                    toggleFrom: "hsl(210, 78%, 56%)",
                    toggleTo: "hsl(146, 68%, 55%)",
                    veryDarkBlueBG: "hsl(230, 17%, 14%)",
                    veryDarkBlueTopBG: "hsl(232, 19%, 15%)",
                    darkDesaturatedBlueCardBG: "hsl(228, 28%, 20%)",
                    desaturatedBlueText: "hsl(228, 34%, 66%)",
                    whiteText: "hsl(0, 0%, 100%)",
                },
                lightTheme: {
                    toggle: "hsl(230, 22%, 74%)",
                    whiteBG: "hsl(0, 0%, 100%)",
                    veryPaleBlueTopBG: "hsl(225, 100%, 98%)",
                    lightGrayishBlueCardBG: "hsl(227, 47%, 96%)",
                    darkGrayishBlueText: "hsl(228, 12%, 44%)",
                    veryDarkBlueText: "hsl(230, 17%, 14%)",
                },
            },
            backgroundImage: {
                "toggle-gradient":
                    "linear-gradient(to right, hsl(210, 78%, 56%), hsl(146, 68%, 55%))",
                "instagram-gradient":
                    "linear-gradient(to right, hsl(37, 97%, 70%), hsl(329, 70%, 58%))",
            },
            fontFamily: {
                Inter: ["Inter"],
            },
        },
    },
    plugins: [],
};
