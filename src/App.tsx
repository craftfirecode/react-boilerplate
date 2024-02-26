import {useEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<LoginWithLocation />} />
                <Route path="/dashboard" element={<DashboardWithLocation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

function LoginWithLocation() {
    const location = useLocation();

    useEffect(() => {
        console.log('URL hat sich geändert:', location.pathname);
        // Weitere Logik für URL-Änderungen hier
    }, [location.pathname]);

    return <Login />;
}

function DashboardWithLocation() {
    const location = useLocation();

    useEffect(() => {
        console.log('URL hat sich geändert:', location.pathname);
        // Weitere Logik für URL-Änderungen hier
    }, [location.pathname]);

    return <Dashboard />;
}
