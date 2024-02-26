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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 md:col-6'>1</div>
                    <div className='col-12 md:col-6'>1</div>
                </div>
            </div>
            <div className='bg-indigo-300 mt-5'>Test</div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 md:col-6'>1</div>
                    <div className='col-12 md:col-6'>1</div>
                </div>
            </div>
        </>
    )
}

export default Login;