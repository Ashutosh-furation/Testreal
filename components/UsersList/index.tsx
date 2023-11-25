"use client";

import { useEffect, useState } from "react";
import AddUsermodal from "../Modals/AddUsermodal";
import UserListCard from "./UserlistCard";
import Heading from "../Heading";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface User {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  projects: [];
  condos: [];
  isSuperAdmin: boolean;
  __v: number;
}

export default function UsersList() {
  const [Showbutton, SetShowbutton] = useState<boolean>(true);

  const [ShowAddUSER, SetShowAdduser] = useState<boolean>(false);

  const [userlist, SetUserlist] = useState<User[]>([]);

  const handleisActiveToggle = (index: any) => {
    const updatedUserList = [...userlist];
    updatedUserList[index].isActive = !updatedUserList[index].isActive;
    SetUserlist(updatedUserList);
  };

  const getAllAdmins = async () => {
    try {
      const response = await axios.get("/api/v1/admins/");
      // console.log(response);
      SetUserlist(response?.data?.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <>
      <div className="Heading-Container  border-red-800">
        <Heading
          SetShowbutton={SetShowbutton}
          greet={"Hello Admin"}
          welcome={" Welcome to list users page"}
          button={"  Add User"}
        />
      </div>

      <div className="Userlist-container border-2 mt-5 bg-white  shadow-md border-[#C2C2C2] rounded p-4">
        <div className="w-full m-auto border-black flex items-center justify-between p-2">
          {/* Search bar */}
          <div className="flex items-center border border-gray-400 rounded-lg px-2">
            <Image
              src={"/assets/search.svg"}
              width={20}
              height={20}
              alt={"search"}
            />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full m-auto p-2 bg-transparent placeholder-gray-500 flex-grow"
            />
          </div>
          {/* ... Other content within the border ... */}
        </div>

        <div className=" rounded my-6 overflow-x-auto">
          <UserListCard userlist={userlist} SetUserlist={SetUserlist} />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      {!Showbutton && <AddUsermodal SetShowAdduser={SetShowbutton} />}
    </>
  );
}
