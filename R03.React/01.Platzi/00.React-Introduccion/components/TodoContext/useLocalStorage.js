import React from "react";

function useLocalStorage(dbName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);

    const saveItem = (array) => {
        try {
            localStorage.setItem(dbName, JSON.stringify(array));
            setItem(array);
        } catch (error) {
            setError(error);
        }
    };

    React.useEffect(() => {
        const getDataLocalStorage = () => {
            try {
                const db_ls = localStorage.getItem(dbName);
                if (!db_ls) {
                    saveItem(initialValue);
                } else {
                    setItem(JSON.parse(db_ls));
                }
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(error);
            }
        };

        setTimeout(() => {
            getDataLocalStorage();
        }, 1000);
    }, [dbName, initialValue]);

    return { loading, error, item, saveItem };
}

export { useLocalStorage };
