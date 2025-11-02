import React from "react";

/**
 * @file useLocalStorage.js
 * @description Custom hook for managing data in localStorage.
 * @param {string} dbName - The name of the database in localStorage.
 * @param {*} initialValue - The initial value for the data.
 * @returns {object} - The state and functions for managing data in localStorage.
 */

function useLocalStorage(dbName, initialValue) {
  //
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [item, setItem] = React.useState(initialValue);
  const [sincronizedItem, setSincronizedItem] = React.useState(true);
  //
  React.useEffect(() => {
    const fetchData = () => {
      try {
        const data = localStorage.getItem(dbName);

        if (!data) {
          localStorage.setItem(dbName, JSON.stringify(initialValue));
        }
        const parsed = data ? JSON.parse(data) : initialValue;
        setItem(parsed);
        setLoading(false);
        setSincronizedItem(true);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [sincronizedItem]);

  const saveItem = (newArray) => {
    try {
      const stringifiedItem = JSON.stringify(newArray);
      localStorage.setItem(dbName, stringifiedItem);
      setItem(newArray);
    } catch (error) {
      setError(error);
    }
  };

  const sincronizeItem = () => {
    setLoading(true);
    setSincronizedItem(false);
  };

  return {
    error,
    loading,
    item,
    saveItem,
    sincronizeItem,
  };
}

export { useLocalStorage };

