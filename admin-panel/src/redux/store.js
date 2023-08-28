import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userDataSlice.js";
import productReducer from "./slices/productDataSlice.js";
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

const rootPersistConfig = {
  key: "root",
  storage,
};

const productPersistConfig = {
  key: "products",
  storage: storageSession,
};

const rootReducer = combineReducers({
  user: userReducer,
  products: persistReducer(productPersistConfig, productReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
