import React from "react";

function useLocalStorage(dbName, initialValue) {
    //
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(initialValue);
    const [sincronizedItem, setSincronizedItem] = React.useState(true);
    //
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = localStorage.getItem(dbName);

                if (!data) {
                    localStorage.setItem(dbName, JSON.stringify(initialValue));
                }
                const parsed = data ? JSON.parse(data) : initialValue;
                setItem(parsed);
                setLoading(false);
                setSincronizedItem(true);
            } catch (error) {
                setError(error);
            }
        };

        setTimeout(fetchData, 3000);
    }, [sincronizedItem]);

    const saveItem = (newArray) => {
        try {
            const stringifiedItem = JSON.stringify(newArray);
            localStorage.setItem(dbName, stringifiedItem);
            setItem(newArray);
        } catch (error) {
            setError(error);
        }
    };

    const sincronizeItem = () => {
        setLoading(true);
        setSincronizedItem(false);
    };

    return {
        error,
        loading,
        item,
        saveItem,
        sincronizeItem,
    };
}

export { useLocalStorage };
