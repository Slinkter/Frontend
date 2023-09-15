import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const Scrollani = () => {
    const [background, setBackground] = useState("gray");
    const divRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const div = divRef.current;
            const { y } = div.getBoundingClientRect();
            const bgColor = y <= 0 ? "red" : "green";
            setBackground(bgColor);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const style = { background, height: "150vh", width: "100vw" };

    return (
        <div ref={divRef} style={style}>
            <h1>.</h1>
        </div>
    );
};

export default Scrollani;
