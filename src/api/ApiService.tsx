import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url: string) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();

        return () => {
            setData([]);
            setError(null);
            setLoading(false);
        };
    }, [url]);

    return { data, error, loading };
};

export default useAxios;
