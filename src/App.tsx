import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Konto from "./pages/Konto";
import {ContentProvider} from "./context/ContentContext";
import TemplateMain from "./Template/TemplateMain";
import NotFound from "./pages/NotFound";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {createClient} from '@supabase/supabase-js';
import Login from "./pages/Login";
import {useSession} from "./context/useSession";
import './main.css';

const supabase = createClient('https://jfgrqcvupvyzyquawwpg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZ3JxY3Z1cHZ5enlxdWF3d3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyODIwMjEsImV4cCI6MjAyNDg1ODAyMX0.D-O2nSRD3N4WWQOLc-aU3lOWof5tqTx3XriGTEpihDQ')

const App = () => {
    const {session, isLoading} = useSession(); // Destructure to get session and isLoading

    if (isLoading) {
        return <></>; // Or any other loading indicator
    }


    return (
        <>
            <ContentProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TemplateMain/>}>
                            {
                                !session ? (
                                        <>
                                            <Route path="/" element={<Login><Auth supabaseClient={supabase}
                                                                                  appearance={{theme: ThemeSupa}}/></Login>}/>
                                            <Route path="*" element={<NotFound/>}/>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Route path="/" element={<Home/>}/>
                                            <Route path="/konto" element={<Konto/>}/>
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
