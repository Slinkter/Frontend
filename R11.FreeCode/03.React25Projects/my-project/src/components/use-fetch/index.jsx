import React, { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setPending(true);
    try {
      const res = await fetch(url, { ...options });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setData(data);
      setError(null);
      setPending(false);
    } catch (error) {
      setError();
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, pending };
};

export default useFetch;
