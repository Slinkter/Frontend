import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
console.log("initialState", initialState);

const modal = {
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
};

const modalSlice = createSlice(modal);

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
