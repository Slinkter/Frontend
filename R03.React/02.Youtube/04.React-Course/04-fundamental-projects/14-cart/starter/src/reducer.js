import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_CART: {
      console.log("🚀 Limpiando carrito...");
      return { ...state, cart: new Map() };
    }

    case REMOVE: {
      const cyCart = new Map(state.cart);
      const idItem = action.payload.id;

      if (!cyCart.has(idItem)) return state; // ✅ Evita errores si el producto no está
      cyCart.delete(idItem);

      return { ...state, cart: cyCart };
    }

    case INCREASE: {
      const cyCart = new Map(state.cart);
      const idItem = action.payload.id;
      const item = cyCart.get(idItem);

      if (!item) return state; // ✅ Evita error si el producto no existe
      const updateItem = { ...item, amount: item.amount + 1 };

      cyCart.set(idItem, updateItem);
      return { ...state, cart: cyCart };
    }

    case DECREASE: {
      const cyCart = new Map(state.cart);
      const idItem = action.payload.id;
      const item = cyCart.get(idItem);

      if (!item) return state; // ✅ Evita error si el producto no existe

      if (item.amount === 1) {
        cyCart.delete(idItem);
      } else {
        const updateItem = { ...item, amount: item.amount - 1 };
        cyCart.set(idItem, updateItem);
      }

      return { ...state, cart: cyCart };
    }

    case LOADING: {
      return { ...state, loading: true };
    }

    case DISPLAY_ITEMS: {
      const cyCart = new Map(
        action.payload.cart.map((item) => [item.id, item])
      );
      return { ...state, cart: cyCart, loading: false };
    }

    default:
      throw new Error(`❌ Acción desconocida: ${action.type}`);
  }
};

export default reducer;
