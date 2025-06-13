import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amout += product.amout;
      } else {
        state.cartItems.push(product);
      }
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cardID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemInCart -= product.amout;
      state.cartTotal -= product.price * product.amout;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amout } = action.payload;
      const item = state.cartItems.find((i) => i.cardID === cartID);
      state.numItemInCart += amout - item.amout;
      state.cartTotal += item.price * (amout - item.amout);
      item.amout = amout;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: () => {},
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
