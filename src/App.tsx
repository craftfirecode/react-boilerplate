import {useState} from "react";
import axios from "axios";

function App() {
    // const apiData = await ApiService.fetchGet('/setting', urlParamsObject);
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:3000/checkSession');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button onClick={checkSession}>checkSession</button>
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

export default App
