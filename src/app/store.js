import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../Redux/Reducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Define your slice reducer here
    blog:authSlice.reducer
  },
});
