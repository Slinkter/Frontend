import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  //
  useEffect(() => {
    // --> function
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        setData(data); //<------------------data
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }

      setIsLoading(false);
    };
    // --> ejecute
    fetchData();
  }, [url]);

  return { isLoading, isError, data };
};

export default useFetch;
