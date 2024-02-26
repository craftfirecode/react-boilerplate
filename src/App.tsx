import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import axios from "axios";
import {createContext, useEffect, useState} from "react";
import TemplateMain from "./Template/TemplateMain.tsx";
import Konto from "./pages/Konto.tsx";

function App() {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState("Jesse Hall");

    const UserContext = createContext<any>(false)

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
                setUser(response.data);
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
            <UserContext.Provider value={user}>
            </UserContext.Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TemplateMain/>}>
                        {login ? (
                            <>
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/konto" element={<Konto/>}/>
                            </>
                        ) : (
                            <>
                                <Route index path="/" element={<Login/>}/>
                            </>
                        )}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default App;
