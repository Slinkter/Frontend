import React, { useState, useEffect } from "react";

const UseEffectBasics = () => {
  //
  const [value, setValue] = useState(0);
  const increment = () => setValue(value + 1);

  useEffect(() => {
    console.log("step 2 : call useEffect");
    if (value > 0) {
      document.title = `New Messages(${value})`;
    }
  });

  console.log("step 1 : render component");
  return (
    <>
      <h1>{value}</h1>
      <button className="btn" onClick={increment}>
        click me
      </button>
    </>
  );
};

export default UseEffectBasics;
