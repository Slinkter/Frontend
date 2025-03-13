import { createAsyncThunk, createSlice, createSlice } from "@reduxjs/toolkit";

const getCartItems = createAsyncThunk();

const createSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: true,
    cartItem: [],
    amount: 0,
    total: 0,
  },
  reducer: {
    clearCart: (state, action) => {
      state.cartItem = [];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItem = state.cartItem.filter((item) => item.id !== id);
    },
    increase: (state, action) => {
      const id = action.payload;
      state.cartItem = state.cartItem.find((item) => item.id === id);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const id = action.payload;
      state.cartItem = state.cartItem.find((item) => item.id === id);
      cartItem.amount -= 1;
    },
    calculateTotals: (state, action) => {},
  },
  extraReducers: (builer) => {
    builer
      .addCase(getCartItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {})
      .addCase(getCartItems.rejected, (state, action) => {});
  },
});
