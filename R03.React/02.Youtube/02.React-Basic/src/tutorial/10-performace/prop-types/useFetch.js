import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
    //
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    //funcion
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };
    //
    useEffect(() => {
        // --> ejecute
        fetchData();
    }, [url]);

    return { isLoading, isError, data };
};

export default useFetch;

/* 
      if (!res.ok) {
                setIsError(true);
                setIsLoading(false);
                return;
            }
*/
