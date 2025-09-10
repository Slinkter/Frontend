import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
    name: "pizza",
    initialState: {
        pizzaBase: 1000,
    },
    reducers: {
        pizza_order: (state) => {
            state.pizzaBase--;
        },
        customer_choice: (state, action) => {
            state.pizzaBase = state.pizzaBase - action.payload;
        },
    },
});

export default pizzaSlice.reducer;
export const { pizza_order, customer_choice } = pizzaSlice.actions;
