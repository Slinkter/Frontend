import React from "react";
import { useRef } from "react";
import { useState } from "react";

const CopyApp = () => {
    // Hooks
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const inputRef = useRef(null);
    // Funcion de copiar
    const handleBtn = () => {
        const input = inputRef.current;
        input.select();
        document.execCommand("copy");
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };
    // -->
    return (
        <div>
            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
            />
            <button onClick={handleBtn}>Copiar </button>
            {isCopied && <h1> es copiado </h1>}
        </div>
    );
};

export default CopyApp;
