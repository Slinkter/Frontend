import React, { useEffect, useRef, useState } from "react";

const initValue = 0;
const initial = null;
const initBoolean = false;

const UseRefBasics = () => {
  //
  const [value, setValue] = useState(initValue);
  const refContainer = useRef(initial);
  const isMounted = useRef(initBoolean);
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = refContainer.current.value;
    //
    console.log("name :", name, "(refContainer.current.value)");
    /* refContainer.current.value = ""; */
  };
  //
  useEffect(() => {
    refContainer.current.focus();
    console.log("useEffect 1 ", refContainer.current);
  });
  //
  useEffect(() => {
    console.log("useEffect 2 ", refContainer.current);
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log("re-render");
    console.log("isMounted.current : ", isMounted.current);
    return () => {};
  }, [value]);
  console.log("-------------------------------------");
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            {" "}
            name
          </label>
          <input
            type="text"
            ref={refContainer}
            id="name"
            className="form-input"
          />
        </div>
        <button className="btn btn-block" type="submit">
          submit
        </button>
      </form>
      <h1>value : {value}</h1>
      <button onClick={() => setValue(value + 1)} className="btn">
        increase
      </button>
    </>
  );
};

export default UseRefBasics;
