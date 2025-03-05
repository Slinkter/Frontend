import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url_api) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        if (!url_api) return;
        try {
            setLoading(true);
            const response = await fetch(url_api);
            const result = await response.json();
            setData(result);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url_api]);

    return { data, loading, error };
};

export default useFetch;
