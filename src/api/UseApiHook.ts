import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Typdefinition für die Hook-Parameter
interface UseApiHookParams {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    data?: any;
    options?: AxiosRequestConfig;
}

const useApiHook = ({
                        url,
                        method = 'get',
                        data = null,
                        options = {}
                    }: UseApiHookParams) => {
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const axiosConfig: AxiosRequestConfig = {
                    url,
                    method,
                    ...options,
                    ...(data && { data }), // Fügt Daten hinzu, wenn vorhanden (relevant für POST, PUT)
                };
                const result = await axios(axiosConfig);
                setResponse(result.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, method, data, JSON.stringify(options)]); // JSON.stringify, um Objekt-Vergleich zu ermöglichen

    return { response, isLoading, error };
};

export default useApiHook;