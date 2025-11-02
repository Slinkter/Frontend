import React from "react";

/**
 * @file useStorageListener.js
 * @description Custom hook for listening to `localStorage` changes from other browser tabs/windows.
 * @param {function} sincronize - The function to call when a change is detected and the user wants to sync.
 * @returns {{show: boolean, toggleShow: function}} - The state and function to manage the storage change alert.
 */
function useStorageListener(sincronize) {
  // State to control the visibility of the alert
  const [storageChange, setStorageChange] = React.useState(false);

  // Add an event listener for the 'storage' event
  window.addEventListener("storage", (change) => {
    // Check if the change happened on the correct key
    if (change.key === "TODOS_V1") {
      console.log("Changes detected in another tab");
      setStorageChange(true);
    }
  });

  /**
   * Toggles the visibility of the alert and triggers the synchronization.
   */
  const toggleShow = () => {
    sincronize(); // Synchronize the state
    setStorageChange(false); // Hide the alert
  };

  return {
    show: storageChange,
    toggleShow,
  };
}

export { useStorageListener };

