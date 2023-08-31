import { createSlice } from "@reduxjs/toolkit";
import {
  addSingleProduct,
  deleteSingleProduct,
  getAllProducts,
} from "../thunks/productThunks.js";

const initialState = {
  products: [],
  loading: false,
  uploadingData: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
      })
      .addCase(addSingleProduct.pending, (state) => {
        state.uploadingData = true;
        state.error = null;
      })
      .addCase(addSingleProduct.fulfilled, (state, action) => {
        state.uploadingData = !state.uploadingData;
        state.products = [...state.products, action.payload];
      })
      .addCase(addSingleProduct.rejected, (state, action) => {
        state.uploadingData = !state.uploadingData;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
