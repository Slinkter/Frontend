import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { getTotals } from "./utils";
import { initialState } from "./initialState";
import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE,
} from "./actions";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    console.log("Appprovider clear cart");

    dispatch({ type: CLEAR_CART });
  };

  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };
  /*  */
  const fechtData = async () => {
    dispatch({ type: LOADING });
    const res = await fetch(url);
    const cart = await res.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };

  useEffect(() => {
    fechtData();
  }, []);
  /*  */
  const props = {
    ...state,
    clearCart,
    remove,
    increase,
    decrease,
    totalAmount,
    totalCost,
  };

  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};

const useGlovalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
export { useGlovalContext };
