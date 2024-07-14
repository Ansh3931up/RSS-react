import { useState } from "react";
import { toast } from "react-hot-toast";
// import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {  loginAccount } from "../Redux/Reducer";

function Loginpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [LoginData, setLoginData] = useState({
    // fullname: "",
    email: "",
    password: ""
    // avatar: null, // Use null to indicate no avatar initially
  });


  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...LoginData,
      [name]: value,
    });
  };


  async function logintoAccount (e){
    e.preventDefault();
    // Basic form validation
    if ([LoginData.email, LoginData.password].some((field) => field.trim() === "")) {
      toast.error("Please fill all details.");
      return;
    }
   
   
  
    // Dispatch action to Redux store
    const response=await dispatch(loginAccount(LoginData));
    console.log(response);
    if(response?.payload?.statusCode===200)
        navigate('/')
    
    
    setLoginData({
        
        email: "",
        password: ""
         
    })
  
    // Redirect or navigate after successful signup
     // Example redirection to login page
  }

  return (
    <>
      <div className="flex items-center justify-center h-[90vh] bg-orange-800">
        <form
          noValidate
          onSubmit={logintoAccount}
          className="flex flex-col bg-orange-50 text-orange-500 justify-center gap-3 rounded-lg p-4 w-96 shadow-[0 0 10px]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          
        
        
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              value={LoginData.email}
              name="email"
              id="email"
              placeholder="Enter your Email..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              value={LoginData.password}
              name="password"
              id="password"
              placeholder="Enter your Password..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-orange-50 py-2 hover:bg-orange-700 transition-all ease-in-out duration-300 rounded-md"
          >
            Create account
          </button>
          <p className="text-center">
            Do not have an accound ?<Link to="/signup" className="link text-accent">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Loginpage;
