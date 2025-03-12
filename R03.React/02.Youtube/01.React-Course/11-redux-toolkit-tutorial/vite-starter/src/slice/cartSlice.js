import { createAsyncThunk, createSlice, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
  cartItem: [],
  amount: 0,
  total: 0,
};
/* middle */
const getCartItems = createAsyncThunk();

const createSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducer: {
    clearCart: (state, action) => {},
    removeItem: (state, action) => {},
    increase: (state, action) => {},
    decrease: (state, action) => {},
    calculateTotals: (state, action) => {},
  },
  extraReducers: (builer) => {},
});
