// App.js
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Konto from "./pages/Konto.tsx";
import {ContentProvider} from "./context/ContentContext.tsx";
import {useSession} from "./context/useSession.tsx";
import TemplateMain from "./Template/TemplateMain.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    const loggedIn = useSession();
    return (
        <>
            <ContentProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TemplateMain/>}>
                            {loggedIn.loggedIn ? (
                                <>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/konto" element={<Konto/>}/>
                                    <Route path="*" element={<NotFound/>}/>
                                </>
                            ) : (
                                <>
                                    <Route path="/" element={<Login/>}/>
                                    <Route path="*" element={<NotFound/>}/>
                                </>
                            )
                            }
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ContentProvider>
        </>
    );
}

export default App;
