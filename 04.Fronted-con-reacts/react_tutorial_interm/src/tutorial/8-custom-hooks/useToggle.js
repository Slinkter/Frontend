import React from "react";
import { useState } from "react";

const useToggle = (value) => {
  const [show, setShow] = useState(value);

  const toggle = () => {
    setShow(!show);
  };
  // variable , function
  return { show, toggle };
};

export default useToggle;
