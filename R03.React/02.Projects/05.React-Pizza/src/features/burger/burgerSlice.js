import { createSlice } from "@reduxjs/toolkit";
import { pizza_order as pizzaOrdered } from "../pizza/pizzaSlice";

const bugerSlice = createSlice({
    name: "burger",
    initialState: {
        burgerBuns: 200,
    },
    reducers: {
        burger_order: (state, actions) => {
            state.burgerBuns--;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(pizzaOrdered, (state) => {
            state.burgerBuns--;
        });
    },
});

export default bugerSlice.reducer;
export const { burger_order } = bugerSlice.actions;
