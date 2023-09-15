import React from "react";

function useLocalStorage(dbName, initialValue) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(initialValue);

    React.useEffect(() => {
        setTimeout(() => {
            try {
                let parsedItem;
                const db_ls = localStorage.getItem(dbName);
                if (!db_ls) {
                    const value = JSON.stringify(initialValue); // string <-- []
                    localStorage.setItem(dbName, value);
                    //
                    parsedItem = initialValue; // parseItem <-- []
                } else {
                    parsedItem = JSON.parse(db_ls); // transformacion a objeto
                }
                setItem(parsedItem);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(error);
            }
        }, 1000);
    }, [dbName, initialValue]);

    const saveItem = (array) => {
        try {
            const value = JSON.stringify(array);
            localStorage.setItem(dbName, value);
            setItem(array);
        } catch (error) {
            setError(error);
        }
    };

    return { loading, error, item, saveItem };
}

export { useLocalStorage };
