import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axios";

const initialState = {
  BlogData: [], // Initialize blogs as an empty array
};

// Async thunk to fetch blog data
export const getblog = createAsyncThunk('blog/getall', async (data) => {
  try {
    const response = await axiosInstance.get('/blog', data);
    
    // Display toast notification with loading state and success message
    toast.promise(
      Promise.resolve(response.data),
      {
        loading: "Wait! Loading data",
        success: () => {
          return "Blog data fetched successfully";
        },
        error: "Failed to fetch blog data"
      }
    );

    return response.data; // Return the actual data fetched
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch blog data");
    throw error; // Rethrow the error to let Redux Toolkit handle it
  }
});

export const createblog=createAsyncThunk('blog/create',async(data)=>{
  try {
    const res = axiosInstance.post("blog/", data);
    toast.promise(res, {
        loading: "Wait! creating your account",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to create account"
    });
    return (await res).data;
} catch(error) {
    toast.error(error?.response?.data?.message);
}
});

// Redux slice for blog state management
export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // You can add reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(getblog.fulfilled, (state, action) => {
      // Update state with fetched blog data when the promise is fulfilled
      state.BlogData = action.payload; // Assuming action.payload is an array of blog items
    }
      
  );
  }
});

export default blogSlice.reducer;
