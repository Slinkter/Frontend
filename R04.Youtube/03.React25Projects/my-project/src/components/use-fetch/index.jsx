import React, { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
    //-->
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    async function fetchData() {
        try {
            setPending(true);
            const res = await fetch(url, { ...options });
            console.log("res ", res);
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            setData(data);
            setError(null);
            setPending(false);
        } catch (error) {
            setError(error);
            setPending(false);
            setData(null);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, pending, error };
};

export default useFetch;
