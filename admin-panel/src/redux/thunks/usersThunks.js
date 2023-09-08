import { createAsyncThunk } from "@reduxjs/toolkit";
import errorParser from "../../utils/errorParser.js";
import api from "../../api/api.js";

// Thunk for getting all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.getAllUsers(token);
      return response.data.users;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);

export const deleteSingleUser = createAsyncThunk(
  "users/deleteSingleUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteSingleUser(token, id);
      const data = { data: response.data, userId: id };
      return data;
    } catch (error) {
      return rejectWithValue(errorParser(error.response.data));
    }
  }
);
