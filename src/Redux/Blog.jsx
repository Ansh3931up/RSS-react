import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axios";

const initialState={
    blogs:[]
}
export const getblog=createAsyncThunk('blog/getall',async(data)=>{
   try {
     const res=axiosInstance.get('/blog',data);
     toast.promise(res,
         {
             loading:"Wait! loading data",
             success:(data)=>{
                 return data?.data?.message;
             },
             error:"Failed to login"
 
         },
        
     );
     return (await res).data;
   } catch (error) {
        toast.error(error?.response?.data?.message);
   }


})
export const blogSlice=createSlice({
    name:'blogs',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getblog.fulfilled,(state,action)=>{
            if(action.payload){
                state.courseData=[...action.payload]
            }
        })
    }
});

export default blogSlice.reducer;