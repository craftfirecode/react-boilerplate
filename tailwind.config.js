import BS5grid from "./src/tailwind/plugin/BS5grid.js";
import BS5spacing from "./src/tailwind/plugin/BS5spacing.js";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['selector', '[data-mode="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
            },
        },
    },
    plugins: [BS5grid, BS5spacing],
}