import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { increment } from "../../final/09-rtk/counterSlice";

type counterStatus = "active" | "inactive" | "pending...";

type CounterState = {
    count: number;
    status: counterStatus;
};

const initialState: CounterState = {
    count: 15,
    status: "pending... wait",
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        setStatus: (state, action: PayloadAction<counterStatus>) => {
            state.status = action.payload;
        },
    },
});

export default counterSlice.reducer;
