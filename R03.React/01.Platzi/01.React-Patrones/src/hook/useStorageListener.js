/**
 * @file This custom hook implements cross-tab synchronization for `localStorage`.
 * @description `useStorageListener` listens for the `storage` event on the `window` object.
 * This event is fired in a tab when another tab from the same origin modifies `localStorage`.
 * The hook encapsulates the logic to detect changes to a specific `localStorage` key ("TODOS_V1")
 * and provides a mechanism to show a notification to the user, allowing them to sync their state.
 * This is a powerful pattern for creating a seamless user experience in multi-tab applications.
 *
 * This hook is an example of a "Higher-Order Hook" in spirit, as it takes a function (`sincronize`)
 * and enhances the application's behavior with new capabilities.
 */

import React from "react";

/**
 * A custom hook that listens for `localStorage` changes from other browser tabs/windows.
 *
 * @param {function} sincronize - A callback function that will be executed to re-sync the application's state with `localStorage`. This function is typically provided by another hook (like `useTodos`).
 * @returns {{show: boolean, toggleShow: function}} An object containing:
 * - `show` (boolean): A state variable that is `true` if a storage change has been detected, used to show an alert component.
 * - `toggleShow` (function): A function to be called by the user to accept the changes. It triggers the `sincronize` callback and then resets the `show` state to `false`.
 */
function useStorageListener(sincronize) {
    // State to control the visibility of the "storage change" notification.
    const [storageChange, setStorageChange] = React.useState(false);

    // Set up the event listener when the component using this hook mounts.
    React.useEffect(() => {
        const listener = (change) => {
            // Ignore changes that are not for our specific localStorage key.
            if (change.key === "TODOS_V1") {
                console.log("Changes detected in another tab for TODOS_V1");
                setStorageChange(true); // Set state to indicate a change was detected.
            }
        };

        // The 'storage' event is the key to cross-tab communication.
        window.addEventListener("storage", listener);

        // Cleanup function to remove the event listener when the component unmounts.
        return () => {
            window.removeEventListener("storage", listener);
        };
    }, []); // Empty dependency array ensures the listener is set up only once.

    /**
     * This function is called when the user chooses to sync the state.
     * It triggers the synchronization logic passed in from the parent component
     * and then hides the notification.
     */
    const toggleShow = () => {
        sincronize(); // Trigger the re-fetch of data from localStorage.
        setStorageChange(false); // Hide the alert.
    };

    // Expose the `show` state and the `toggleShow` function.
    return {
        show: storageChange,
        toggleShow,
    };
}

export { useStorageListener };