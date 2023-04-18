import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Features/AuthSlice";

// Reducer
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
