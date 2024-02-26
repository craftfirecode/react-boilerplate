import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import axios from "axios";
import {useEffect} from "react";

function App() {
    const checkSession = async () => {
        try {
            const response = await axios.get('/api/checkSession', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, authorization'
                },
                withCredentials: true
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkSession().then();
        // execute on location change
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
