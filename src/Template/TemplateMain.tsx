import {Outlet} from "react-router-dom";
import Footer from "../component/Footer.tsx";
import Nav from "../component/Nav.tsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-1 flex my-5">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default Layout;