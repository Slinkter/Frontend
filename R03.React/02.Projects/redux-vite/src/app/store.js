import { configureStore } from "@reduxjs/toolkit";

import pizzaReducer from "../features/pizza/pizzaSlice";
import bugerReducer from "../features/burger/burgerSlice";
import productsReducer from "../features/products/productSlice";

const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
        burger: bugerReducer,
        products: productsReducer,
    },
});

export default store;
