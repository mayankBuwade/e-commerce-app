import { createAsyncThunk } from "@reduxjs/toolkit";
import errorParser from "../../utils/errorParser.js";
import api from "../../api/api.js";

// Thunk for getting all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.getAllProducts(token);
      console.log(response);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "products/deleteSingleProduct",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteSingleProduct(token, id);
      const data = { data: response.data, productId: id };
      return data;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);

export const addSingleProduct = createAsyncThunk(
  "products/addSingleProduct",
  async ({ token, product }, { rejectWithValue }) => {
    try {
      const response = await api.addSingleProduct(token, product);
      console.log(response);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);
