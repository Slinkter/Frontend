/**
 * @file This custom hook provides a robust interface for interacting with the browser's `localStorage`.
 * @description `useLocalStorage` abstracts the logic for persisting and retrieving data from `localStorage`,
 * making it behave like a React state that is synchronized with browser storage. It handles
 * initialization, loading and error states, and provides a mechanism for manual re-synchronization.
 * This hook is a foundational piece of the application's data persistence strategy.
 * The 1-second delay is simulated to demonstrate how the application behaves in a more realistic,
 * asynchronous environment where data fetching might take time.
 */

import React from "react";

/**
 * A custom hook to manage data persistence in `localStorage`.
 *
 * @param {string} dbName The key name to use in `localStorage`.
 * @param {*} initialValue The initial value to use if no data is found for the given `dbName`.
 * @returns {object} An object containing the persisted state and management functions.
 * @property {boolean} loading - True while the data is being loaded or re-synced from `localStorage`.
 * @property {boolean} error - True if an error occurred during the process (e.g., JSON parsing).
 * @property {*} item - The current value of the data retrieved from `localStorage`.
 * @property {function} saveItem - A function to update the `item` state and persist it to `localStorage`.
 * @property {function} sincronizeItem - A function to manually trigger a re-load from `localStorage`.
 */
function useLocalStorage(dbName, initialValue) {
    // State to manage the loading status. True by default to indicate initial load.
    const [loading, setLoading] = React.useState(true);
    // State to capture any potential errors during localStorage interaction.
    const [error, setError] = React.useState(false);
    // The main state that holds the data. Initialized with the provided `initialValue`.
    const [item, setItem] = React.useState(initialValue);
    // A state that acts as a trigger for re-synchronization.
    const [sincronizedItem, setSincronizedItem] = React.useState(true);

    // This effect runs on mount and whenever `sincronizedItem` changes.
    React.useEffect(() => {
        // A 1-second timeout is used to simulate a slow data fetch,
        // which helps in visualizing the loading state in the UI.
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(dbName);
                let parsedItem;

                // If no item is found in localStorage, initialize it with `initialValue`.
                if (!localStorageItem) {
                    localStorage.setItem(
                        dbName,
                        JSON.stringify(initialValue)
                    );
                    parsedItem = initialValue;
                } else {
                    // If an item is found, parse it from its JSON string representation.
                    parsedItem = JSON.parse(localStorageItem);
                }

                setItem(parsedItem);
                setSincronizedItem(true);
            } catch (error) {
                // If any error occurs (e.g., parsing invalid JSON), update the error state.
                setError(error);
            } finally {
                // Regardless of the outcome, the loading process is finished.
                setLoading(false);
            }
        }, 1000);
    }, [sincronizedItem]);

    /**
     * Updates the state and persists the new value to `localStorage`.
     * @param {*} newItem The new data to be saved.
     */
    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(dbName, stringifiedItem);
            // Update the React state to trigger a re-render.
            setItem(newItem);
        } catch (error) {
            setError(error);
        }
    };

    /**
     * Triggers a manual re-synchronization with `localStorage`.
     * This is used for cross-tab updates.
     */
    const sincronizeItem = () => {
        setLoading(true); // Show loading state.
        setSincronizedItem(false); // Trigger the useEffect hook.
    };

    // Return the state and functions to be consumed by other hooks or components.
    return {
        item,
        saveItem,
        loading,
        error,
        sincronizeItem,
    };
}

export { useLocalStorage };