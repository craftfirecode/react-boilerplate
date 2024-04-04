import {Link, Outlet} from "react-router-dom";
import Footer from "../component/Footer.tsx";
import Nav from "../component/Nav.tsx";
import {useEffect, useState} from "react";
import ApiService from "../api/ApiService.tsx";

const Layout = () => {
    const [data, setData] = useState<any>();

    const urlParamsObject: any = {
        populate: {
            nav: {populate: "*"}
        }
    };
    const fetchData = async () => {
        try {
            const apiData = await ApiService.fetchGet('/setting', urlParamsObject);
            setData(apiData.data.attributes.nav);
        } catch (error) {
            // Fehlerbehandlung
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Nav/>
            {data && data.map((item: any) => (
                <Link key={item.id}
                      className="text-dark hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                      to={{pathname: item.link}}
                      state={item}>{item.title}</Link>
            ))}
            <main className="flex-1 flex my-5">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
};

export default Layout;