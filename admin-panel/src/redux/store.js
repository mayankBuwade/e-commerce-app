import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userDataSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
