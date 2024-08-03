import React from "react";
import useToggle from "./useToggle";

const ToggleExample = () => {
    const { show, toggle } = useToggle(true);

    return (
        <>
            <h4>toggle custom hook</h4>
            <button className="btn" onClick={toggle}>
                toggle
            </button>
            {show && <h4> some stuff</h4>}
        </>
    );
};

export default ToggleExample;
