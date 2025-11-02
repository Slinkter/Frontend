import React from "react";

function useLocalStorage(dbName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);

    React.useEffect(() => {
        setTimeout(() => {
            getDataLocalStorage();
        }, 1000);
    }, [dbName, initialValue]);

    const getDataLocalStorage = () => {
        try {
            setLoading(true);
            const db_ls = localStorage.getItem(dbName);
            if (!db_ls) {
                saveItem(initialValue);
            } else {
                setItem(JSON.parse(db_ls));
            }

            setError(false);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    // save in localStorage y items
    const saveItem = (array) => {
        try {
            localStorage.setItem(dbName, JSON.stringify(array));
            setItem(array);
        } catch (error) {
            setError(error);
        }
    };

    return { loading, error, item, saveItem };
}

export { useLocalStorage };
