"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import AdminPage from "@/components/Admin";
import AdminNavbar from "@/components/AdminNavbar";
import Overlay from "@/components/Overlay";

export default function Home() {
  const [selectedcategory, SetSelectedcategory] = useState("user");
  const [Showbutton, SetShowbutton] = useState<boolean>(true);
  const [ProjectData, SetProjectsData] = useState<boolean>(true);
  const [CondosData, SetCondosData] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleSelectedCategory = (plan: any) => {
    SetSelectedcategory(plan);
  };
  const ToggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    // This code will only run on the client side
    if (typeof window !== "undefined") {
      // Client-side code here
    }
  }, []);

  return (
    <>
      <main className="overflow-hidden  border-red-700 ">
        <div className="Main-container  w-[100%] min-h-screen border-red-900">
          <div className="AdminNavbar block sm:hidden  border-black">
            <AdminNavbar
              setDrawerOpen={setDrawerOpen}
              drawerOpen={drawerOpen}
            />
          </div>

          {drawerOpen && <Overlay closeDrawer={ToggleDrawer} />}

          {/****************** */}

          {drawerOpen ? (
            <div className=" px-2 ">
              <div
                className="drawer-container px-2 py-20  fixed left-0 top-0 bottom-0 w-[50%] 
              md:w-[50%] lg:w-[30%] z-50 md:hidden pt-20 bg-black text-white"
              >
                <div className="flex justify-between items-center ">
                  <button
                    onClick={ToggleDrawer}
                    className="absolute top-2 right-2 text-white cursor-pointer"
                  >
                    X
                  </button>
                  <div></div>
                </div>

                <div className="Navbar-Box">
                  <SideBar
                    SetSelectedcategory={SetSelectedcategory}
                    selectedcategory={selectedcategory}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div> </div>
          )}

          <div className="Box-container  w-[100%] flex justify-between border-yellow-600">
            <div
              className="SideBar-container hidden sm:block  py-2 px-2 bg-black border-green-700  
            w-[30%] md:w-[30%] lg:w-[20%] min-h-screen"
            >
              <div className="fixed lg:px-4 ">
                <SideBar
                  SetSelectedcategory={SetSelectedcategory}
                  selectedcategory={selectedcategory}
                />
              </div>
            </div>

            <div className="Admin-container  border-pink-700 w-[100%] m-auto mt-2 sm:w-[80%]  lg:w-[80%] min-h-screen">
              <AdminPage
                selectedcategory={selectedcategory}
                SetSelectedcategory={SetSelectedcategory}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
