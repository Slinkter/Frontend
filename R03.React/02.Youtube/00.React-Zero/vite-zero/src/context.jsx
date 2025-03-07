import { useReducer } from "react";
import { types } from "./types";
import { reducer } from "./redecuer";
import { initialState } from "./state";
import { createContext } from "react";
import { useEffect } from "react";
import { getTotals } from "./utils";
import { useContext } from "react";

// Context [provider]
// ContenedorProvider
const url = "https://www.course-api.com/react-useReducer-cart-project";

const ContextCart = createContext();
const useGlobalContext = () => {
  return useContext(ContextCart);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: types.CLEART_CART });
  };
  const remove = (id) => {
    dispatch({ type: types.REMOVE, payload: { id } });
  };
  const increase = (id) => {
    dispatch({ type: types.INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: types.DECREASE, payload: { id } });
  };
  const fetchData = async () => {
    dispatch({ type: types.LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: types.DISPLAY_ITEM, payload: { cart } });
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const props = {
    ...state,
    clearCart,
    remove,
    increase,
    decrease,
    totalAmount,
    totalCost,
  };

  return <ContextCart.Provider value={props}>{children}</ContextCart.Provider>;
};

export { ContextProvider };
export { useGlobalContext };

/* 
https://github.com/Slinkter/Frontend/blob/main/R03.React/02.Youtube/01.React-Course/04-fundamental-projects/14-cart/final/src/context.jsx

*/
