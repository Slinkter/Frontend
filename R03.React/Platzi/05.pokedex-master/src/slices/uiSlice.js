import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

export const uiSliece = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = uiSliece.actions;
export default uiSliece.reducer;
