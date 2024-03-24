import React, { createContext, useState, useEffect, useContext } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem("theme") || "cyber"
    );
    const [isReady, setIsReady] = useState(false); // Neuer Zustand, um den Ladezustand zu verwalten

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const html = document.documentElement;
        html.setAttribute('data-mode', theme);
        setIsReady(true); // Setze isReady auf true, nachdem das Attribut gesetzt wurde
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "cyber" ? "light" : "cyber"));
    };

    if (!isReady) {
        return <div>Loading...</div>; // Zeige einen Ladebildschirm oder nichts, während isReady false ist
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeProvider;