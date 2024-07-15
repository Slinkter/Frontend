import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const getProducts = useCallback(async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.log("error");
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        getProducts();
    }, [url, getProducts]);

    return { loading, products };
};
