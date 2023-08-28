import { createAsyncThunk } from "@reduxjs/toolkit";
import errorParser from "../../utils/errorParser.js";
import api from "../../api/api.js";

// Thunk for getting all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.getAllProducts(token);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);
