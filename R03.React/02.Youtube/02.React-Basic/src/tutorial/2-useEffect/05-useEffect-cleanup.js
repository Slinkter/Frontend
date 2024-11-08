import React, { useState, useEffect } from "react";

// cleanup function
// second argument

const UseEffectCleanup = () => {
    // hooks
    const [size, setSize] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    // funcion
    const handleBtnShow = () => setShow(!show);
    //
    useEffect(() => {
        console.log("2- useEffect start");
        const func_updateWidth = () => setSize(window.innerWidth);
        window.addEventListener("resize", func_updateWidth);
        return () => {
            console.log("3 - cleanup - useEffect end");
            window.removeEventListener("resize", func_updateWidth);
        };
    }, []);
    console.log("1 - render component ");
    return (
        <>
            <button onClick={handleBtnShow}>show</button>
            {show && (
                <>
                    <h1>window</h1>
                    <h2>{size} PX</h2>
                </>
            )}
        </>
    );
};

export default UseEffectCleanup;
