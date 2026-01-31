import { useReducer } from "react";
import { counterReducer, initialState } from "./reducer";

function Component() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h2>Count : {state.count}</h2>
      <h2>Status : {state.status}</h2>
      <div className="btn-container">
        <button className="btn" onClick={() => dispatch({ type: "increment" })}>
          INCREMENTE
        </button>
        <button className="btn" onClick={() => dispatch({ type: "decrement" })}>
          DECREMENT
        </button>
        <button className="btn" onClick={() => dispatch({ type: "reset" })}>
          RESET
        </button>
      </div>
      <div className="btn-container">
        <button
          className="btn"
          onClick={() => dispatch({ type: "setStatus", payload: "active" })}
        >
          Set Status to Actives
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "setStatus", payload: "inactive" })}
        >
          Set Status to Inactives
        </button>
      </div>
    </div>
  );
}
export default Component;
