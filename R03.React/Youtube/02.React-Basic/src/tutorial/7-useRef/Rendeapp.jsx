import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Rendeapp = () => {
    const [text, setText] = useState("");
    const renderRef = useRef(1);

    useEffect(() => {
        console.log("useEffect", renderRef);
        return () => {};
    }, []);

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <h1> Counter - {renderRef.current} </h1>
        </div>
    );
};

export default Rendeapp;
