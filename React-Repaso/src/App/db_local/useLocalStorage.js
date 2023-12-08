import { useEffect, useState } from "react";

const useLocalStorage = (dbName, initValue) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [item, setItem] = useState(initValue);
  const [syncItem, setSyncItem] = useState(true);

  /*  */
  useEffect(() => {
    console.log("useEffect");
    setTimeout(() => {
      try {
        const data = localStorage.getItem(dbName);
        let parsedItem;

        if (!data) {
          localStorage.setItem(dbName, JSON.stringify(initValue));
          parsedItem = initValue;
        } else {
          parsedItem = JSON.parse(data);
        }
        console.log("setTimeout");
        setItem(parsedItem);
        setLoading(false);
        setSyncItem(true);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }, 3000);
  }, [syncItem]);

  /*  */
  const saveItem = (list) => {
    try {
      setItem(list);
      localStorage, setItem(dbName, JSON.stringify(list));
    } catch (error) {
      setError(error);
    }
  };
  const synceItem = () => {
    setLoading(true);
    setSyncItem(false);
  };

  /*  */
  return {
    loading,
    error,
    item,
    syncItem,
    saveItem,
    synceItem,
  };
};

export default useLocalStorage;
