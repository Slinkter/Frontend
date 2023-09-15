import React, { useState } from "react";

function CodeExample() {
  const [value, setValue] = useState(0);
  const sayHello = () => {
    console.log("hello there");
  };
  sayHello();
  return (
    <>
      <h1>value : {value}</h1>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
}

export default CodeExample;
