import { useEffect, useState } from "react";
// [theme  , dark]
function useLocalStorage(key, defaultValue) {
  const initValue = {
    value: () => {
      let preParsed;
      let currentValue;
      try {
        preParsed = localStorage.getItem(key) || String(defaultValue);
        currentValue = JSON.parse(preParsed);
      } catch (error) {
        currentValue = defaultValue;
        console.log(error);
      }
      return currentValue;
    },
  };

  const [value, setValue] = useState(initValue.value);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    return () => {};
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
