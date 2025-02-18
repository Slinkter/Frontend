import React from "react";
import { useReducer } from "react";

const types = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
};
const reducer = (state, action) => {
  switch (action.types) {
    case types.INCREMENT:
      return { ...state, count: state.count + 1 };
    case types.DECREMENT:
      return { ...state, count: state.count - 1 };
    case types.RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
};
const initialState = { count: 0 };

const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIncrement = () => {
    dispatch({ types: types.INCREMENT });
  };
  const onDecrement = () => {
    dispatch({ types: types.DECREMENT });
  };

  const onReset = () => {
    dispatch({ types: types.RESET });
  };

  return (
    <div>
      <div className="text-center">
        <h1 className=" text-gray-100 text-2xl font-bold ">
          count : {state.count}
        </h1>
      </div>
      <div className="flex flex-row gap-2">
        <button className="btn-default " onClick={onIncrement}>
          +
        </button>

        <button className="btn-default " onClick={onDecrement}>
          -
        </button>

        <button className="btn-default " onClick={onReset}>
          reset
        </button>
      </div>
    </div>
  );
};

export default CounterReducer;
