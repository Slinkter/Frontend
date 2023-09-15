import { useState } from "react";

const useCounter = (initialValue) => {
    const [counter, setCounter] = useState(initialValue);

    function incrementar() {
        setCounter(counter + 1);
    }

    function reset() {
        setCounter(initialValue);
    }

    return [counter, incrementar, reset];
};

export default useCounter;
