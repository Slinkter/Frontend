import { useEffect } from "react";
import { useState } from "react";

const useLocalStorage = (dbName) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [data, setData] = useState([]);

    const getDataLocal = () => {
        const bd_local = localStorage.getItem(dbName);
        if (!bd_local) {
            localStorage.setItem(dbName, JSON.stringify([]));
            setData([]);
        } else {
            setData(JSON.parse(bd_local));
        }
    };

    const setDataLocal = (list) => {
        try {
            localStorage.setItem(dbName, JSON.stringify(list));
            setData(list);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    /*  */

    useEffect(() => {
        setLoading(true);
        try {
            getDataLocal();
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, data, setDataLocal };
};

export default useLocalStorage;
