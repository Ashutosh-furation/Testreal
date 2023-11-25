"use client";
import axios from "axios"
import React, { useState } from "react";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ADDUSER } from "@/Redux/AuthReducer/Action";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../app/Firebase/firebase"
export default function AddUsermodal({ SetShowAdduser }: any) {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:"",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("userdata", formData);

 
   const handlesubmit = (e: any) => {
    e.preventDefault();
   // setLoading(true);
    const { email,  name, password } = formData;
    if (email.trim() === "" || name.trim() === "" || password.trim()===""  ) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
  if (password.length < 6) {
      setLoading(false);
      toast.error("min length of password 6");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password )
    .then((res)=>{
      console.log("res",res)
        if(res?.user){
          const senddatabackend = {
            email: formData.email,
            name:formData.name
          };
          ADDUSER(senddatabackend)(dispatch)
            .then((res) => {
              // console.log("createuser", res);
              if (res?.type === "ADDUSERSUCESS") {
                toast.success("Admin created successfully")
               SetShowAdduser(true)
              }
            })
            .catch((error) => {
              console.log("created user err", error);
            
            });
        }
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorcode", errorCode);
      console.log("errmessage", errorMessage);
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already exists with this email.");
      } else {
        toast.error("An error occurred during signup.");
      }
   console.error("Error during signup firebase call:", error);
    })

    
  };
 

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-[#111111] opacity-50"></div>

        <div
          className={`absolute w-[90%] sm:w-[60%] lg:w-[40%] left-1/2 top-1/2 transform 
            -translate-x-1/2 -translate-y-1/2 
            overflow-x-hidden   z-[100]   scrollbar-none `}
        >
          <div
            className="w-[100%] py-2 relative
               m-auto   bg-[#FAFAFA]
            border rounded-lg border-grey-600"
          >
            <div className="px-6 py-4">
              <h2 className="text-[1rem] font-bold "> Add User </h2>
            </div>

            <form onSubmit={handlesubmit}>
              <div
                className="w-[100%] sm:w-[90%] md:w-[100%] 
                rounded-lg px-6 py-4 gap-2  border-red-700"
              >
                <label htmlFor="Email" className="font-medium text-sm">
                  Name
                </label>

                <div className="flex   py-2 justify-between items-center">
                  <input
                    type="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full md:py-3 px-4 rounded
                    text-sm border border-primaryfont  p-2  "
                    placeholder={"Name of business " || formData.name}
                  />
                </div>

                <label htmlFor="Email" className="font-medium text-sm">
                  Enter your email address
                </label>

                <div className="flex  py-2 justify-between items-center">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full md:py-3 px-4 rounded
                    text-sm border border-primaryfont  p-2  "
                    placeholder={"michelle.rivera@gmail.com " || formData.email}
                  />
                </div>

                <label
                  htmlFor="password"
                  className="mt-2 font-medium   text-sm"
                >
                  Set Password
                </label>

                <div className="relative py-2">
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none  relative block
                 w-full  md:py-3 px-4   p-2  
                   border border-primaryfont rounded
               z-10 "
                    placeholder="Add a Password"
                    onChange={handleInputChange}
                  />
                  <div
                    className="absolute  px-4 
                  inset-y-0 right-0 
                  flex items-center z-10 text-sm leading-5"
                  >
                    <button
                      type="button"
                      className="text-white"
                      onClick={togglePasswordVisibility}
                    ></button>
                  </div>
                </div>

                <div className="mt-2 py-2">
                  <div
                    onClick={handlesubmit}
                    className={`py-2 px-2 text-white bg-black 
                  flex items-center justify-center
                   cursor-pointer
                  border-yellow-600 rounded`}
                  >
                    <button
                      className={` py-1 px-2 font-normal text-sm text-center `}
                    >
                      Add User
                    </button>
                  </div>
                </div>

                <div className=" mt-2 pb-4">
                  <div
                    onClick={() => SetShowAdduser(true)}
                    className={`py-2 px-2 
                  flex items-center justify-center
                   cursor-pointer
                  border border-black rounded`}
                  >
                    <button
                      className={` py-1 px-2  font-semibold text-sm text-center `}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toast />
    </>
  );
}
