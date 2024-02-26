import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

const Login = () => {
    const location = useLocation();

    useEffect(() => {
        // execute on location change
        console.log('Location changed!', location.pathname);
    }, [location]);
    // const apiData = await ApiService.fetchGet('/setting', urlParamsObject);
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, authorization'
                },
                withCredentials: true
            });
            document.location.reload();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <Link to={'/dashboard'}>APP</Link>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='mb-3'>Anmelden</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div className='row'>
                                <div className='col-12 mt-3 md:col-6'>
                                    <input
                                        type="text"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="appearance-none rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                                    />
                                </div>
                                <div className='col-12 mt-3 md:col-6'>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="appearance-none rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                                    />
                                </div>
                            </div>
                            <button type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;