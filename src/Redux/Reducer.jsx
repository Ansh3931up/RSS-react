import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helpers/axios.jsx"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn")||false,
    // isLoggedIn:false,
    avatar:localStorage.getItem('avatar') || null,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data')=== undefined ? JSON.parse(localStorage.getItem('data')) : {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
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
})
export const loginAccount=createAsyncThunk('auth/login',async(data)=>{
    try {
        const res=axiosInstance.post('user/login',data);
        toast.promise(
            res,{
                loading:"Wait! login to your account",
                success:(data)=>{
                    return data?.data?.message;
                },
                error:"Failed to login"
            }
        );
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})
export const logout=createAsyncThunk('auth/logout',async(data)=>{
 try {
       const res=axiosInstance.post('user/logout',data);
       toast.promise(
           res,
           {
               loading:"Wait! for logout",
               success:(data)=>{
                   return data?.data?.message
               },
               error:"Failed to logout"
           }
       );
       return (await res).data;
   }
  catch (error) {
    toast.error(error?.response?.data?.message);
    }
})

// Slice definition
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers:(builder)=>{
    builder.addCase(loginAccount.fulfilled,(state,action)=>{
        // om successful account creation
        state.isLoggedIn = true; // Set isLoggedIn to true upon successful creation
        state.data = action.payload;
        state.role=action?.payload?.user?.role;
        state.avatar=action?.payload?.data?.avatar; 
        localStorage.setItem("avatar",action?.payload?.data?.avatar)// Update data with the payload returned from the API
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data",JSON.stringify(action?.payload?.user))
        localStorage.setItem("role",action?.payload?.user?.role);

    })
    builder.addCase(logout.fulfilled,(state)=>{
        localStorage.clear();
        state.isLoggedIn=false;
        state.data={};
        state.role="";
    })
    
  
  }
    
    // Handle the createAccount.fulfilled action
    
//     // Handle the createAccount.rejected action
//     builder.addCase(createAccount.rejected, (state, action) => {
//       // Handle errors or state updates upon rejection (optional)
//       console.error("Create account failed:", action.error);
//     });
//   },
});

export default authSlice.reducer;
