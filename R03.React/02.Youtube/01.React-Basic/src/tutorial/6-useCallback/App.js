import React, { useCallback, useState } from "react";

function App() {
  //
  const [count, setCount] = useState(0);
  const [otherCounter, setOtherCounter] = useState(0);
  const functionsCounter = new Set();
  //

  /*
    La función “useCallback” 
    -Se utiliza para evitar que las funciones de incremento 
    y decremento se vuelvan a crear cada vez que se renderiza el componente
    */

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decrease = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  const incrementOtherCounter = useCallback(() => {
    setOtherCounter(otherCounter + 1);
  }, [otherCounter]);

  functionsCounter.add(increment);
  functionsCounter.add(decrease);
  functionsCounter.add(incrementOtherCounter);

  return (
    <div>
      <div>
        Count :{count}
        <div>otherCounter :{otherCounter}</div>
      </div>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrease}>-</button>
        <button onClick={incrementOtherCounter}>increment</button>
      </div>
    </div>
  );
}

export default App;
