/** @format */

import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import weather from "./weatherSlice";
import firebase from "./firebaseSlice";
export const store = configureStore({
  reducer: {
    auth,
    weather,
    firebase,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
