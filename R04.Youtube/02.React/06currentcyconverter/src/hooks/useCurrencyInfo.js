import React, { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const urlchanged =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  useEffect(() => {
    fetch(`${urlchanged}/${currency}.json`)
      .then((res) => res.json())
      .then((res) => setData(res[currency]));
  }, [currency]);

  console.log(data);
  return data;
};

export default useCurrencyInfo;
