import BS5grid from "./src/tailwind/plugin/BS5grid.js";
import BS5spacing from "./src/tailwind/plugin/BS5spacing.js";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [BS5grid, BS5spacing],
}