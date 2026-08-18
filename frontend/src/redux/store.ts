import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.ts";
import apiSlice from "./slices/apiSlice.ts";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
