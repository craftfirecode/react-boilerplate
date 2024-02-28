// useSession.js
import {useEffect, useState} from "react";
import axios from "axios";

export function useSession() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('/api/checkSession', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, authorization'
                    },
                    withCredentials: true
                });

                if (response) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);

                }
            } catch (error) {
                console.error(error);
            }
        };

        checkSession().then();
    }, []);

    return loggedIn;
}
