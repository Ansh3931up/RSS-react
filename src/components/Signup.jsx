import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createAccount } from "../Redux/Reducer";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: null, // Use null to indicate no avatar initially
  });

  const [previewImage, setPreviewImage] = useState("");

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setSignupData({
        ...signupData,
        avatar: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function createNewAccount (e){
    e.preventDefault();
    // Basic form validation
    if ([signupData.email, signupData.password, signupData.fullname].some((field) => field.trim() === "")) {
      toast.error("Please fill all details.");
      return;
    }
    if(signupData.fullname.length<5){
        toast.error("Name should be at least 6 digit")
        return;
    }
    
    if(signupData.password.length<8){
        toast.error("Password should be at least 8 digit")
        return ;
    }
    if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
        toast.error("Password should contain atleast one number and one special character");
        return ;
    }
    if(!signupData.email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        toast.error("Invalid emailID");
        return;
    }
    const formData=new FormData();
    formData.append('fullname',signupData.fullname);
    formData.append('email',signupData.email);
    formData.append('password',signupData.password);
    formData.append('avatar',signupData.avatar);
    // Dispatch action to Redux store
    const response=await dispatch(createAccount(formData));
    console.log(response);
    if(response?.payload?.statusCode===200)
        navigate('/')
    
    
    setSignupData({
        fullname: "",
        email: "",
        password: "",
        avatar: null, 
    })
    setPreviewImage("");
    // Redirect or navigate after successful signup
     // Example redirection to login page
  }

  return (
    <>
      <div className="flex items-center justify-center h-[90vh] bg-orange-800">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col bg-orange-50 text-orange-500 justify-center gap-3 rounded-lg p-4 w-96 shadow-[0 0 10px]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label htmlFor="imageUpload" className="cursor-pointer">
            {previewImage ? (
              <img src={previewImage} className="w-24 h-24 rounded-full m-auto" alt="Preview" />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            id="imageUpload"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            name="imageUploads"
            onChange={handleImageChange}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              required
              value={signupData.fullname}
              name="fullname"
              id="fullname"
              placeholder="Enter your Name..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              value={signupData.email}
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
              value={signupData.password}
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
            Already have an account ?<Link to="/login" className="link text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
