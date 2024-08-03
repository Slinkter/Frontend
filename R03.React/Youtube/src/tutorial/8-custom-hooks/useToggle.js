import React from "react";
import { useState } from "react";

const useToggle = (value) => {
    const [show, setShow] = useState(value);
    const toggle = () => setShow(!show);
    return { show, toggle };
};

export default useToggle;
