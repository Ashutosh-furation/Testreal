"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdminNavbar = ({ setDrawerOpen, drawerOpen }: any) => {
  const router = useRouter();

  const homeredirect = () => {
    router.push("/");
  };

  return (
    <nav className="w-full m-auto mx-auto border-red-600 z-40">
      <div
        className="fixed  py-2 px-2 sm:px-12  mx-auto  
        w-[100%]  flex justify-between items-center  
        bg-black
     
      "
      >
       
        {!drawerOpen ? (
          <Image
            src={"/assets/menu.svg"}
            alt="menu-icon"
            width={50}
            height={50}
            className="w-[4%] h-[40%]  sm:w-[4%] lg:w-[2.5%] lg:h-[2.5%%] hover:cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />
        ) : (
          <Image
            src={"/assets/x.svg"}
            alt="close-icon"
            width={50}
            height={50}
            className="w-[7%] h-[40%] lg:w-[2.5%] lg:h-[2.5%%] hover:cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <div className="flex justify-between">
         {/* <div className="text-start text-white"> Logo</div> */}
         <div> </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
