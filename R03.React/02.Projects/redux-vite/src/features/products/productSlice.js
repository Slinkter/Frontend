import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    error: "",
};

const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
    return axios
        .get("https://fakestoreapi.com/products")
        .then((res) => res.data.map((product) => product.title))
        .catch((err) => err.message);
});

const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        build.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = "";
        });
        build.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default productSlice.reducer;
export { fetchProducts };
