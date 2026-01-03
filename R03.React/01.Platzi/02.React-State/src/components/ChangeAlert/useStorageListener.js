import React from "react";

/**
 * Custom hook to listen for changes in `localStorage` across different browser tabs or windows.
 * It provides a mechanism to alert the user about external data changes and trigger a synchronization.
 *
 * @param {function(): void} sincronize A callback function to trigger data synchronization when `localStorage` changes.
 * @returns {{
 *  show: boolean,
 *  toggleShow: function(): void
 * }} An object containing a `show` flag (indicating a change) and a `toggleShow` function to handle synchronization.
 */
function useStorageListener(sincronize) {
    /**
     * State to track if there has been a change in localStorage from another tab.
     * @type {[boolean, function(boolean): void]}
     */
    const [storageChange, setStorageChange] = React.useState(false);

    React.useEffect(() => {
        /**
         * Event listener for the 'storage' event.
         * Checks if the change is for 'TODOS_V1' and sets `storageChange` to true.
         * @param {StorageEvent} change The storage event object.
         */
        const onChange = (change) => {
            if (change.key === "TODOS_V1") {
                console.log("Hubo cambios en TODOS_V1");
                setStorageChange(true);
            }
        };

        window.addEventListener("storage", onChange);

        // Cleanup function to remove the event listener when the component unmounts
        return () => window.removeEventListener("storage", onChange);
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount.

    /**
     * Toggles the visibility of the change alert and triggers data synchronization.
     */
    const toggleShow = () => {
        sincronize();
        setStorageChange(false);
    };

    return {
        show: storageChange,
        toggleShow,
    };
}

export { useStorageListener };
