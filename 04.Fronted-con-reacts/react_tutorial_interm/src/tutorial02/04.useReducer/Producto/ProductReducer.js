import { types } from "./ProductTypes";
import { initialState } from "./ProductDb";

//
const productReducer = (state, action) => {
    switch (action.type) {
        //
        case types.productShow: {
            const product = action.payload;
            return { ...state, activeProduct: product };
        }
        //
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
                          product.id === productQuery.id
                              ? { ...product, quantity: product.quantity + 1 }
                              : product
                      ),
                  }
                : {
                      ...state,
                      cart: [...state.cart, { ...productQuery, quantity: 1 }],
                  };
            console.log(productQuery);
            console.log(isProductOnCart);
            console.log();
            return newStateCart;
        }
        //
        case types.productRemoveFromCart:
            return {
                ...state,
                cart: [
                    ...state.cart.filter(
                        (product) => product.id !== action.payload
                    ),
                ],
            };
        //
        case types.productRemoveOneFromCart:
            //case : descontar 1 ,
            const itemId = action.payload;
            // search and get product by id from Cart
            const isProductFound = state.cart.find(
                (productCart) => productCart.id === itemId
            );
            //
            const aux =
                isProductFound.quantity > 1
                    ? {
                          ...state,
                          cart: [
                              ...state.cart.map((product) =>
                                  product.id === isProductFound.id
                                      ? {
                                            ...product,
                                            quantity: product.quantity - 1,
                                        }
                                      : product
                              ),
                          ],
                      }
                    : {
                          ...state,
                          cart: state.cart.filter(
                              (product) => product.id !== itemId
                          ),
                      };

            return aux;
        default:
            return state;
    }
};

export { productReducer };

/**
 
Claro. Aquí hay un ejemplo paso a paso de cómo funciona este código:

1. Supongamos que el estado actual del carrito de compras es el siguiente:
```javascript
state = {
    cart: [
        { id: 1, name: "Producto 1" },
        { id: 2, name: "Producto 2" },
        { id: 3, name: "Producto 3" }
    ]
}
```
2. Supongamos que se envía una acción para eliminar el producto con `id` igual a `2` del carrito:
```javascript
action = {
    type: "REMOVE_FROM_CART",
    payload: 2
}
```
3. El código que proporcionaste se ejecutará dentro de la función reductora para manejar esta acción.
 Primero, se crea una nueva matriz utilizando el método `filter` para incluir solo los productos cuyo `id` 
 no coincide con `action.payload` (en este caso, `2`):
```javascript
state.cart.filter((product) => product.id !== action.payload)
// Devuelve una nueva matriz que contiene solo los productos con id 1 y 3
```
4. Luego, esta nueva matriz se asigna a la propiedad `cart` del nuevo estado utilizando el operador de 
propagación (`...`) para crear una copia superficial de la matriz:
```javascript
cart: [
    ...state.cart.filter((product) => product.id !== action.payload),
]
// El nuevo estado del carrito es [{ id: 1, name: "Producto 1" }, { id: 3, name: "Producto 3" }]
```
5. Finalmente, el nuevo estado se devuelve y el carrito de compras se actualiza para reflejar la 
eliminación del producto.

¿Te queda más claro ahora?
  
  
  
 
 */
