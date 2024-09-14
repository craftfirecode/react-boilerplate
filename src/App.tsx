import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Konto from "./pages/Konto";
import TemplateMain from "./Template/TemplateMain";
import NotFound from "./pages/NotFound";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Login from "./pages/Login";
import { useSession } from "./context/useSession";
import { supabase } from "./supabaseClient";

const App = () => {
  const { session, isLoading } = useSession(); // Destructure to get session and isLoading

  if (isLoading) {
    return <></>; // Or any other loading indicator
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TemplateMain />}>
            {!session ? (
              <>
                <Route
                  path="/"
                  element={
                    <Login>
                      <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                      />
                    </Login>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/konto" element={<Konto />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
