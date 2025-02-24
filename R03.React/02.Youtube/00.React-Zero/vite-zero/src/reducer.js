import { types } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case types.show: {
      return { ...state, activeProduct: action.payload };
    }
    case types.add: {
      const isOnList = state.cart.some(
        (product) => product.id === action.payload.id
      );
      // const updateState = isOnList ? "cantidad +=1" : "cantidad = 1";
      const updateState = isOnList
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };

      return updateState;
    }
    case types.remove: {
      const isFound = state.cart.find((item) => item.id === action.payload.id);
      const updateState =
        isFound && isFound.quantity <= 1
          ? {
              ...state,
              cart: state.cart.filter((item) => item.id !== action.payload.id),
            }
          : {
              ...state,
              cart: state.cart.map((item) =>
                item.id === action.payload.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };

      return updateState;
    }
    case types.clear: {
      return { ...state };
    }
  }
};

export { reducer };
