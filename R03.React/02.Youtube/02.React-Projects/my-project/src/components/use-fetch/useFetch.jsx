import { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
    //-->
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(true);
    const [data, setData] = useState([]);
    //-->
    async function fetchData() {
        try {
            setPending(true);
            const res = await fetch(url, { ...options });
            const data = await res.json();
            /*  */
            if (!res.ok) throw new Error(res.statusText);
            setData(data);
            setError(null);
            setPending(false);
        } catch (error) {
            setError(error);
            setData([]);
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, pending, error };
};

export default useFetch;
