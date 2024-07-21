import { configureStore } from "@reduxjs/toolkit";

import { blogSlice } from "../Redux/Blog";
import { photoSlice } from "../Redux/gallery";
import { authSlice } from "../Redux/Reducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Define your slice reducer here
    blog:blogSlice.reducer,
    photo:photoSlice.reducer
  },
});
