import {Outlet} from "react-router-dom";
import Footer from "../component/Footer.tsx";
import Nav from "../component/Nav.tsx";
import DropdownUi from "../component/DropdownUi.tsx";
import PopOver from "../component/PopOver.tsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav/>
            <DropdownUi />
            <div className="flex">
                <PopOver />
                <PopOver />
            </div>
            <main className="flex-1 flex my-5">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
};

export default Layout;