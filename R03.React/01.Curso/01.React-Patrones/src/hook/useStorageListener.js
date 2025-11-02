import React from "react";

/**
 * @file useStorageListener.js
 * @description Custom hook for listening to changes in localStorage.
 * @param {function} sincronize - The function to call when a change is detected.
 * @returns {object} - The state and functions for managing the storage listener.
 */

function useStorageListener(sincronize) {
  const [storageChange, setStorageChange] = React.useState(false);

  window.addEventListener("storage", (change) => {
    if (change.key === "TODOS_V1") {
      setStorageChange(true);
    }
  });

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

