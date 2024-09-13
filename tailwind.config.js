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
            container: {
                center: true,
                padding: '2rem',
                screens: {
                  sm: '640px',
                  md: '768px',
                  lg: '1024px',
                  xl: '1180px',
                  '2xl': '1280px',
                },
              },
        },
    },
}