import React, { useState } from "react";

const initialCount = 0;

const UseStateCounter = () => {
  const [value, setValue] = useState(initialCount);

  const increase = () => setValue(value + 1);
  const decrease = () => setValue(value - 1);
  const reset = () => setValue(initialCount);

  return (
    <>
      <section style={{ margin: "4rem 0" }}>
        <h2>regular counter</h2>
        <h1>{value}</h1>
        <button className="btn" onClick={increase}>
          increase
        </button>
        <button className="btn" onClick={decrease}>
          decrease
        </button>
        <button className="btn" onClick={reset}>
          reset
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
