"use client";

import { Loginpost } from "@/Redux/AuthReducer/Action";
// import { auth } from "@/app/Firebase/firebase";
import { auth } from "../../Firebase/firebase";
import Toast from "@/components/Toast/Toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
interface Token {
  // Define the properties of your token
  token: string;
  // ... other properties
}
interface ResponseWithPayload {
  type: string;
  // payload: AxiosResponse<any, any>;
  payload: AxiosResponse<any, any>;
}

interface ResponseWithoutPayload {
  type: string;
}

// Create a union type that includes both possible response structures
type MyResponse = ResponseWithPayload | ResponseWithoutPayload;

const Loginpage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email.trim() === "" || password.trim() === "") {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.error("check your password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log("Login res", res);
        if (res?.user) {
          Loginpost(formData)(dispatch)
            .then((res) => {
              // console.log("res", res);
               if ("payload" in res) {
                //  const responseData: Token | undefined =
                //    res?.payload?.token;
                 const responseData= res?.payload
                  //  console.log("response",responseData)
                 if (responseData) {
                  //  console.log("response3333333", responseData);
                   //  const { token } = responseData;
                   // console.log("toekn",token)
                   // Store token in localStorage
                    localStorage.setItem("token", JSON.stringify(responseData));
                   toast.success("Login successful");
                 } else {
                   console.error("No token found in response data");
                 }
               } else {
                 // 'res' does not have the 'payload' property
                 console.log("Response does not contain payload");
               }
              
              if (res?.type === "LOGINUSERSUCESS") {
                toast.success("Login sucessful");
                router.push("/");
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
           toast.error(errorCode);
        console.log("err", error);
      });
  };

  return (
    <>
      <div
        className="min-h-screen max-w-7xl flex items-center  m-auto 
         border-green-600"
      >
        <div
          className="w-[100%] py-2 
           md:w-[50%] lg:w-[30%] m-auto px-2  bg-[#FAFAFA]
        border rounded-lg border-grey-600"
        >
          <div className=" flex py-2 justify-center items-center m-auto border-rose-900">
            <Image
              src={"/assets/LoginLogo.svg"}
              width={100}
              height={100}
              alt="Logo"
            />
          </div>

          <div className=" px-4 py-1">
            <h2 className="text-[1.8rem] font-bold "> Welcome ! </h2>
          </div>

          <form onSubmit={handlesubmit}>
            <div
              className="w-[100%] sm:w-[80%] md:w-[100%] 
             rounded-lg px-6 py-4 gap-2  border-red-700"
            >
              <label htmlFor="Email" className="font-medium text-sm">
                Enter your email address
              </label>

              <div className="flex mt-2 py-2 justify-between items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full md:py-3 px-4
                    text-sm border border-primaryfont  p-2  "
                  placeholder={"Email " || formData.email}
                />
              </div>

              <label htmlFor="password" className="mt-2 font-medium   text-sm">
                Password
              </label>

              <div className="relative py-2 ">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none  relative block
                 w-full  md:py-3 px-4   p-2 
                   border border-primaryfont
               z-10 "
                  placeholder="Password"
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
                  >
                    <div className=" w-5 h-5  border-yellow-400">
                      <Image
                        src={"/assets/eye-off.svg"}
                        width={100}
                        height={100}
                        alt="eye-off"
                      />
                    </div>
                    {/* {passwordVisible ? (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    ) : (
                      <AiFillEye className="h-5 w-5" />
                    )} */}
                  </button>
                </div>
              </div>

              <div className=" py-2 border-red-800">
                <h2 className="text-end text-sm font-semibold">
                  {" "}
                  Forget Password ?
                </h2>
              </div>

              <div className="Login-Button mt-2 pb-4">
                <div
                  onClick={handlesubmit}
                  className={`py-2 px-2 text-white bg-black 
                  flex items-center justify-center
                   cursor-pointer
                  border-yellow-600 rounded-md`}
                >
                  <button
                    className={` py-1 px-2 font-normal text-sm text-center `}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default Loginpage;
