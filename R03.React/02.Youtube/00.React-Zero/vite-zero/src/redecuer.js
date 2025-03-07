import { types } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case types.CLEART_CART: {
      return { ...state, cart: new Map() };
    }
    case types.REMOVE: {
      const cyCart = new Map(state.cart);
      const id = action.payload.id;
      cyCart.delete(id);
      return { ...state, cart: cyCart };
    }
    case types.INCREASE: {
      // amout +1
      const cyCart = new Map(state.cart);
      const id = action.payload.id;
      const item = cyCart.get(id);
      const updateItem = { ...item, amount: item.amount + 1 };
      cyCart.set(id, updateItem);
      return { ...state, cart: cyCart };
    }
    case types.DECREASE: {
      // amout -1
      const cyCart = new Map(state.cart);
      const id = action.payload.id;
      const item = cyCart.get(id);
      const updateItem = { ...item, amount: item.amount - 1 };
      if (updateItem.amount === 0) {
        cyCart.delete(id);
      } else {
        cyCart.set(id, updateItem);
      }
      return { ...state, cart: cyCart };
    }
    case types.LOADING: {
      return { ...state, loading: true };
    }
    case types.DISPLAY_ITEM: {
      const list = action.payload.cart.map((item) => [item.id, item]);
      const newCart = new Map(list);
      return { ...state, loading: false, cart: newCart };
    }
    default:
      throw new Error("No matching action type");
  }
};

export { reducer };
