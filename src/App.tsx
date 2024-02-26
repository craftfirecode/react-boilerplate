import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [login, setLogin] = useState(false)
    const checkSession = async () => {
        try {
            const response = await axios.get('/api/checkSession', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, authorization'
                },
                withCredentials: true
            });

            if (response) {
                setLogin(true);
                console.log('true')
            } else {
                setLogin(false);
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkSession().then();
        // execute on location change
    }, []);

    return (
        <>
        {login ? 'true' : 'false'}
            <BrowserRouter>
                <Routes>
                    {login ? (
                        <>
                            <Route index path="/" element={<Login/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </>
                    ) : (
                        <>
                            <Route index path="/" element={<Login/>}/>
                        </>
                    )}

                </Routes>
            </BrowserRouter>
        </>
    )

}

export default App;
