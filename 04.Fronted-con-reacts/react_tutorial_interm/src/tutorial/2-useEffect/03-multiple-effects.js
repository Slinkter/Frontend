import React, { useEffect, useState } from "react";

const MultipleEffects = () => {
  const [value, setValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  const handleUpdateFirstValue = () => {
    setValue(value + 1);
  };
  const handleUpdateSecondValue = () => {
    setSecondValue(secondValue + 1);
  };

  // firtValue
  useEffect(() => {
    console.log(" useEffect value");
    return () => {};
  }, [value]);
  // secondValue
  useEffect(() => {
    console.log(" useEffect secondvalue");
    return () => {};
  }, [secondValue]);

  console.log("1- Componet Render", value);

  return (
    <>
      <h1>MultipleEffects </h1>
      <br />
      <h2>value : {value}</h2>
      <button onClick={handleUpdateFirstValue}>value</button>
      <h2>secondValue : {secondValue}</h2>
      <button onClick={handleUpdateSecondValue}>second value</button>
    </>
  );
};

export default MultipleEffects;
