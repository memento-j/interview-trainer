import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    //get theme from localStorage on mount
    useEffect(() => {
            const storedTheme = (localStorage.getItem("theme") as Theme) || "dark";
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
    }, []);

    //update html tag and local storage value when the theme changes
    useEffect(() => {
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(theme);
            localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}