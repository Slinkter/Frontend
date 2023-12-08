import React from "react";

function useLocalStorage(dbName, initialValue) {
  //
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [item, setItem] = React.useState(initialValue);
  // HOC - actulizador de estado , para ejecutar useEffect
  const [sincronizedItem, setSincronizedItem] = React.useState(true);
  //
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const data = localStorage.getItem(dbName);
        let parsed;

        if (!data) {
          localStorage.setItem(dbName, JSON.stringify(initialValue));
          parsed = initialValue;
        } else {
          parsed = JSON.parse(data);
        }
        setItem(parsed);
        setLoading(false);
        setSincronizedItem(true);
      } catch (error) {
        setError(error);
      }
    }, 3000);
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
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

export { useLocalStorage };
