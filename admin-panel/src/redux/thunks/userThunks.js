import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
import errorParser from "../../utils/errorParser.js";

// Thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.loginUser(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);

// Thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserDetails(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);
