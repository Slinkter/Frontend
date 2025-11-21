import React from "react";

/**
 * @file useLocalStorage.js
 * @description Custom hook for managing data in `localStorage`.
 * It handles loading, error, and synchronization states.
 * @param {string} dbName - The name of the key in `localStorage`.
 * @param {*} initialValue - The initial value if no data is found in `localStorage`.
 * @returns {{item: *, saveItem: function, loading: boolean, error: boolean, sincronizeItem: function}} - The state and functions for managing data in `localStorage`.
 */
function useLocalStorage(dbName, initialValue) {
    // State to track loading status
    const [loading, setLoading] = React.useState(true);
    // State to track any errors
    const [error, setError] = React.useState(false);
    // State for the stored item
    const [item, setItem] = React.useState(initialValue);
    // State to force synchronization
    const [sincronizedItem, setSincronizedItem] = React.useState(true);

    React.useEffect(() => {
        // Simulate a delay to show the loading state
        setTimeout(() => {
            try {
                const db_ls = localStorage.getItem(dbName);
                let parsedList;
                // If no item exists, create it with the initial value
                if (!db_ls) {
                    localStorage.setItem(dbName, JSON.stringify(initialValue));
                    parsedList = initialValue;
                } else {
                    parsedList = JSON.parse(db_ls);
                }

                setItem(parsedList);
                setLoading(false);
                setSincronizedItem(true);
            } catch (error) {
                setError(error);
            }
        }, 1000); // 1-second delay
    }, [dbName, initialValue, sincronizedItem]);

    /**
     * Saves a new item to `localStorage` and updates the state.
     * @param {*} newItem - The new item to save.
     */
    const saveItem = (newItem) => {
        try {
            const stringifiedList = JSON.stringify(newItem);
            localStorage.setItem(dbName, stringifiedList);
            setItem(newItem);
        } catch (error) {
            setError(error);
        }
    };

    /**
     * Triggers a re-fetch of the data from `localStorage`.
     */
    const sincronizeItem = () => {
        setLoading(true);
        setSincronizedItem(false);
    };

    return {
        item,
        saveItem,
        loading,
        error,
        sincronizeItem,
    };
}

export { useLocalStorage };
