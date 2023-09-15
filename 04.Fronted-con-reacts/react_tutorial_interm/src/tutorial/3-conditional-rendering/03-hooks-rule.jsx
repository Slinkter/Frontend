import React, { useEffect, useState } from "react";

const Example = () => {
  //
  const [condition, setCondition] = useState(true);
  //
  useEffect(() => {
    console.log("hello useEffecer");
  }, []);
  //
  if (condition) {
    return <h2>hello condition</h2>;
  }

  return <>Example</>;
};

export default Example;
