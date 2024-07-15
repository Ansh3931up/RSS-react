import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../Redux/Reducer";
import { blogSlice } from "../Redux/Blog";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Define your slice reducer here
    blog:blogSlice.reducer
  },
});
