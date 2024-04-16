import React, { useEffect, useRef, useState } from "react";

const initValue = 0;
const initial = null;
const initBoolean = false;

const UseRefBasics = () => {
  //
  const [value, setValue] = useState(initValue);
  const refInput = useRef(initial); // inputs
  const isMounted = useRef(initBoolean); // useffect
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = refInput.current.value;
  };
  //
  useEffect(() => {
    refInput.current.focus();
  });
  //
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log("re-render");
    console.log("isMounted.current : ", isMounted.current);
    return () => {};
  }, [value]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input ref={refInput} type="text" id="name" className="form-input" />
        </div>

        <button className="btn btn-block" type="submit">
          submit
        </button>
      </form>
      {/*  */}
      <h1>value : {value}</h1>
      <button onClick={() => setValue(value + 1)} className="btn">
        increase
      </button>
    </>
  );
};

export default UseRefBasics;
