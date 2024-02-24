import { useEffect, useState } from "react";
// theme  , dark
function useLocalStorage(key, defaultValue) {
  const initValue = {
    value: () => {
      let currentValue;
      try {
        currentValue = JSON.parse(
          localStorage.getItem(key) || String(defaultValue)
        );
      } catch (error) {
        console.log(error);
        currentValue = defaultValue;
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
