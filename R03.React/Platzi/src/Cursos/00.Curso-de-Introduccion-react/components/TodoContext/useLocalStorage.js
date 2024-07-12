import React from "react";

function useLocalStorage(dbName, initialValue) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(initialValue);

    const getDataLocalStorage = () => {
        try {
            const db_ls = localStorage.getItem(dbName);
            if (!db_ls) {
                const stringList = JSON.stringify(initialValue);
                localStorage.setItem(dbName, stringList);
                setItem(initialValue);
            } else {
                setItem(JSON.parse(db_ls));
            }
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(error);
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            getDataLocalStorage();
        }, 1000);
    }, [dbName, initialValue]);

    const saveItem = (array) => {
        try {
            const stringList = JSON.stringify(array);
            localStorage.setItem(dbName, stringList);
            setItem(array);
        } catch (error) {
            setError(error);
        }
    };

    return { loading, error, item, saveItem };
}

export { useLocalStorage };
