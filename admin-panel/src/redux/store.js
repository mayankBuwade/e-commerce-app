import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userDataSlice.js";
import productReducer from "./slices/productDataSlice.js";
import usersReducer from "./slices/usersDataSlice.js";
import storage from "redux-persist/lib/storage";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
};

const usersPersistConfig = {
  key: "users",
  storage: storageSession,
};

const productPersistConfig = {
  key: "products",
  storage: storageSession,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  products: persistReducer(productPersistConfig, productReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
