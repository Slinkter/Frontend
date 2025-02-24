import { types } from "./ProductTypes"; // Importa los tipos de acciones desde el archivo ProductTypes

const productReducer = (state, action) => {
  switch (action.type) {
    // case 1: Mostrar un producto
    case types.productShow: {
      return { ...state, activeProduct: action.payload }; // Actualiza el estado con el producto activo
    }
    // case 2: Agregar un producto al carrito
    case types.productAddToCart: {
      const productQuery = action.payload; // Obtiene el producto del payload de la acción
      // Verifica si el producto ya está en el carrito usando includes
      const isProductOnCart = state.cart.some(
        (productCart) => productCart.id === productQuery.id
      );
      // Si el producto ya está en el carrito, incrementa la cantidad
      // Si no, agrega el producto al carrito con cantidad 1
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

      return newStateCart; // Retorna el nuevo estado del carrito
    }
    // case 3: Eliminar un producto del carrito
    case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload), // Filtra el carrito para eliminar el producto por id
      };
    // case 4: Eliminar una unidad de un producto del carrito
    case types.productRemoveOneFromCart: {
      const itemId = action.payload; // Obtiene el id del producto del payload de la acción
      // Verifica si el producto está en el carrito
      const isProductFound = state.cart.find(
        (productCart) => productCart.id === itemId
      );
      // Si la cantidad del producto es 1 o menos, lo elimina del carrito
      // Si no, decrementa la cantidad del producto en 1
      const newState =
        isProductFound && isProductFound.quantity <= 1
          ? {
              ...state,
              cart: state.cart.filter((product) => product.id !== itemId),
            }
          : {
              ...state,
              cart: state.cart.map((product) =>
                product.id !== itemId
                  ? product
                  : {
                      ...product,
                      quantity: product.quantity - 1,
                    }
              ),
            };

      return newState; // Retorna el nuevo estado del carrito
    }
    // case 5: Acción por defecto, retorna el estado actual
    default:
      return state;
  }
};

export { productReducer }; // Exporta el reducer para ser utilizado en otros componentes
