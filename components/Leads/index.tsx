"use client";
import { useEffect, useState } from "react";

import LeadCard from "./LeadCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface Lead {
  _id: string;
  postedDate: string;
  developerEmail: string;
  messageFromDeveloper: string;
  __v: number;
}

export default function Leads() {
  const [leadList, SetLeadlist] = useState<Lead[]>([]);

  const getAllLead = async () => {
    try {
      const response = await axios.get("/api/v1/leads");
      console.log(response);
      SetLeadlist(response?.data?.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllLead();
  }, []);

  return (
    <>
      <div className="Top-Heading flex justify-between px-2  border-green-900">
        <div className="admin">
          <h2 className="text-2xl py-2 font-semibold">Hello , Admin ! </h2>
          <p className="text-[#707070] py-1 font-normal text-lg">
            Welcome to Leads page{" "}
          </p>
        </div>
      </div>
      <div className="border-2 mt-5 bg-white shadow-md rounded border-[#C2C2C2]  p-4">
        <div className=" my-6 overflow-x-auto">
          <LeadCard leadList={leadList} />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
