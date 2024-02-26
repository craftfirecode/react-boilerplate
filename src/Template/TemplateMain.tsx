import {Outlet} from "react-router-dom";
import Footer from "../pages/Footer.tsx";
import Nav from "../pages/Nav.tsx";

const Layout = () => {
    return (
        <>
            <Nav/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
};

export default Layout;