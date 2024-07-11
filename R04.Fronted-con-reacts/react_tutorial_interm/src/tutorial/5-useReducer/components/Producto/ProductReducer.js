import { types } from "./ProductTypes";

const productReducer = (state, action) => {
    switch (action.type) {
        // case 1
        case types.productShow: {
            const product = action.payload;
            return { ...state, activeProduct: product };
        }
        // case 2
        case types.productAddToCart: {
            // preguntar si el producto esta en la lista Cart by id ,
            // true , devuelve el producto
            // false , devuelve undefined
            const productQuery = action.payload;
            const isProductOnCart = state.cart.find(
                (productCart) => productCart.id === productQuery.id
            );
            // preguntar si
            // (true) si existe ,al producto existente se suma +1
            // (false) si es undefined  se agregar nuevo producto a la lista cart el producto
            const newStateCart = isProductOnCart
                ? {
                      ...state,
                      cart: state.cart.map((product) =>
                          product.id !== productQuery.id
                              ? product
                              : { ...product, quantity: product.quantity + 1 }
                      ),
                  }
                : {
                      ...state,
                      cart: [...state.cart, { ...productQuery, quantity: 1 }],
                  };

            return newStateCart;
        }
        //case 3
        case types.productRemoveFromCart:
            return {
                ...state,
                cart: state.cart.filter(
                    (product) => product.id !== action.payload
                ),
            };
        // case 4
        case types.productRemoveOneFromCart:
            //case : descontar 1 ,
            const itemId = action.payload;
            const isProductFound = state.cart.find(
                (productCart) => productCart.id === itemId
            );
            //
            const newState =
                isProductFound.quantity < 1
                    ? {
                          ...state,
                          cart: state.cart.filter(
                              (product) => product.id !== itemId
                          ),
                      }
                    : {
                          ...state,
                          cart: state.cart.map((product) =>
                              product.id !== isProductFound.id
                                  ? product
                                  : {
                                        ...product,
                                        quantity: product.quantity - 1,
                                    }
                          ),
                      };

            return newState;
        // case 5
        default:
            return state;
    }
};

export { productReducer };
