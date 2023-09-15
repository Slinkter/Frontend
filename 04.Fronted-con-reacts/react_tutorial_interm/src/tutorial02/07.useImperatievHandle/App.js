import React, { useRef } from "react";
import "../App.css";

function App() {
    const inputRef = useRef(null);

    return (
        <div className="App">
            <Child onFocus={() => inputRef.current.focus()} />
        </div>
    );
}

function Child(props, ref) {
    const input = useRef();
    return (
        <div>
            <input
                type="text"
                ref={input}
                {...props}
                placeholder="Type something"
            />
        </div>
    );
}

export default App;
