import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSingleProduct,
  getAllProducts,
} from "../thunks/productThunks.js";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...action.payload];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        const productId = action.payload.productId;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      });
  },
});

export default productSlice.reducer;
