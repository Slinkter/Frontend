import { ThemeProvider, useTheme } from "./context";

function Component() {
    const context = useTheme();
    console.log(context);
    return (
        <div>
            <h2>React & Typescript</h2>

            <button
                className="btn btn-"
                onClick={() => {
                    if (context.theme === "dark") {
                        context.setTheme("light");
                        return;
                    }
                    context.setTheme("dark");
                }}
            >
                toogle theme
            </button>
        </div>
    );
}

function ParentComponent() {
    return (
        <ThemeProvider>
            <Component />
        </ThemeProvider>
    );
}

export default ParentComponent;
