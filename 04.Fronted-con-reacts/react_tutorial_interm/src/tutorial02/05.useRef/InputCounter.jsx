import React, { useEffect, useRef } from "react";
import { useState } from "react";

const InputCounter = () => {
    const [text, setText] = useState("");
    const [count, setCount] = useState(null);

    const countRef = useRef(0); // number
    const inputRef = useRef(null); // element input
    //
    const handleIncrementCountRef = () => {
        setCount(countRef.current++);
    };

    const handleButton = () => {
        const input = inputRef.current;
        input.focus();
        input.value = text;
    };
    //
    useEffect(() => {
        console.log("useEffect eject");
    }, [countRef]);
    //
    return (
        <div>
            <br />
            <section>
                <button onClick={handleIncrementCountRef}> CountRef +1 </button>
                <p> {count}</p>
            </section>
            <br />
            <section>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="text"
                    ref={inputRef}
                />
                <button onClick={handleButton}>Focus me </button>
            </section>
        </div>
    );
};

export default InputCounter;
