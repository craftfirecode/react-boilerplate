import { Outlet, Link } from "react-router-dom";
import Footer from "../pages/Footer.tsx";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
};

export default Layout;