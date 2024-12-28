import React, { useState } from "react";
import { data } from "./data";

const App = () => {
    const [counter, setCounter] = useState(0);

    const reset = () => setCounter(0);
    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);
    /*  */
    return (
        <div className="flex flex-col min-h-dvh bg-gray-800 justify-center items-center">
            <h1 className="text-white m-2 text-4xl">{counter}</h1>
            <div className="flex justify-center items-center space-x-4">
                <button className="btn-change w-20" onClick={increment}>
                    +
                </button>
                <button className="btn-change w-20" onClick={decrement}>
                    -
                </button>
                <button className="btn-change w-20" onClick={reset}>
                    reset
                </button>
            </div>
        </div>
    );
};

export default App;
