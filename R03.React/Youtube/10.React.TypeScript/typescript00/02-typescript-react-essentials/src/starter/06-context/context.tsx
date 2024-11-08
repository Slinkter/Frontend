import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeProviderState = {
    theme: Theme;
    setTheme: (Theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
    undefined
);

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
};

export function ThemeProvider({
    children,
    defaultTheme = "system",
}: ThemeProviderProps) {
    /*  */
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    //const objName = { name: "helooo themeprovider" };

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error("useTheme must bve used within the Theme");
    }
    return context;
};
