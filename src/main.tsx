import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './tailwind/tailwind.scss'
import ThemeProvider from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
)
