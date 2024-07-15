import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axios";
import { isEmail } from "../Helpers/regexMatcher";
import updateImage from "./update.jpg"

function Contactpage() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: ""
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = await axiosInstance.post('/contact', userInput);
      toast.promise(response, {
        loading: "Submitting your message ...",
        success: "Form submitted successfully",
        error: "Failed to submit the form"
      });

      if (response.data.success) {
        setUserInput({
          name: "",
          email: "",
          message: ""
        });
      }
    } catch (error) {
      toast.error("Failed to submit the form");
    }
  }

  return (
    <div className="flex h-screen items-center bg-orange-100 justify-center "style={{ backgroundImage: `url(${updateImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <form noValidate onSubmit={onFormSubmit} className="flex flex-col bg-white items-center justify-center gap-4 p-6 rounded-lg text-gray-800 shadow-lg w-96">
        <h1 className="text-3xl font-semibold mb-4 text-orange-600">Contact Form</h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="font-semibold text-orange-600">
            Name
          </label>
          <input
            type="text"
            required
            value={userInput.name}
            name="name"
            id="name"
            placeholder="Enter your Name..."
            className="bg-transparent px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
            onChange={handleUserInput}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="font-semibold text-orange-600">
            Email
          </label>
          <input
            type="email"
            required
            value={userInput.email}
            name="email"
            id="email"
            placeholder="Enter your Email..."
            className="bg-transparent px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
            onChange={handleUserInput}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="message" className="font-semibold text-orange-600">
            Message
          </label>
          <textarea
            required
            value={userInput.message}
            name="message"
            id="message"
            placeholder="Enter your Message..."
            className="bg-transparent px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
            onChange={handleUserInput}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-all ease-in-out duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contactpage;
