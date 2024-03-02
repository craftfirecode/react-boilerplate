import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const Login = ({children}: any) => {
    const location = useLocation();

    useEffect(() => {
        // execute on location change
        console.log('Location changed!', location.pathname);
    }, [location]);
    // const apiData = await ApiService.fetchGet('/setting', urlParamsObject);

    return (
        <div className='w-screen'>
            <div className='container'>
                <div className='row md:justify-center'>
                    <div className='col-12 md:col-8'>
                        <h1 className='mb-3 text-center font-light uppercase'>Anmelden</h1>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;