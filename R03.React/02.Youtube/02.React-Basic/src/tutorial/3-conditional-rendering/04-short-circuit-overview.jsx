import React, { useState } from "react";
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("susan");
  const codeExample = text || "hellow word ";
  const [isError, setIsError] = useState(false);
  const firstValue = text || "A";
  const secondValue = text && "B";

  return (
    <>
      <h4> Falsy OR : {text || "hello work"}</h4>
      <h4> Falsy AND : {text && "hello word"}</h4>
      <h4>Truthy OR {name || "hello world"}</h4>
      <h4>Truthy AND {name && "hello world"}</h4>
      {codeExample}
      <hr />
      {<p> Rpta 11: {firstValue}</p> && <p>value : {secondValue}</p>}
      <p> Rpta : {text || "john doe"}</p>
      <hr />
      <button className="btn" onClick={() => setIsError(!isError)}>
        toggle error
      </button>
      {isError && <h1>Error...</h1>}
      {isError ? (
        <p>there is an error...</p>
      ) : (
        <div>
          <h2>no error</h2>
        </div>
      )}
      <hr />
    </>
  );
};

export default ShortCircuit;
