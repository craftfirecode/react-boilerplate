import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";

const Dashboard = () => {

    const location = useLocation();

    useEffect(() => {
        // execute on location change
        console.log('Location changed!', location.pathname);
    }, [location]);

    return (
        <>
            <div>
                <Link to={'/'}>APP</Link>
            </div>
            Dashboard
        </>
    )
}

export default Dashboard;