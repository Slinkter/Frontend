import React from "react";
import { useState } from "react";

const Counter = () => {
  const [counter, setCount] = useState(0);
  return (
    <button
      className="btn"
      style={{ marginBottom: "1rem" }}
      onClick={() => setCount(counter + 1)}
    >
      count :{counter}
    </button>
  );
};

export default Counter;
