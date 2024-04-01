import {Outlet} from "react-router-dom";
import Footer from "../component/Footer.tsx";
import Nav from "../component/Nav.tsx";
import PopOver from "../component/PopOver.tsx";
import DropdownHero from "../component/DropdownHero.tsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav/>
            <div className="flex">
                <PopOver />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
                <DropdownHero />
            </div>
            <main className="flex-1 flex my-5">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
};

export default Layout;