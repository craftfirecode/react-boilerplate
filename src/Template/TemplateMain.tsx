import {Outlet} from "react-router-dom";
import Footer from "../component/Footer.tsx";
import Nav from "../component/Nav.tsx";
import HeroMenu from "../component/HeroMenu.tsx";
import PopOver from "../component/PopOver.tsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <HeroMenu />
            Demo
            <div className="ms-auto">
                <ul>
                    <li>
                       1 <PopOver />
                    </li>
                    <li>
                       1 <PopOver />
                    </li>
                </ul>
                <PopOver />
                <PopOver />

            </div>
            <main className="flex-1 flex my-5">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default Layout;