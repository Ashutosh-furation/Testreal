"use client";

import { useEffect, useState } from "react";

import CondosCard from "./CondosCard";
import Heading from "../Heading";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface condo {
  _id: string;
  name: string;
  shortDescription: string;
  developerName: string;
  address: string;
  city: string;
  country: string;
  landmark: string;
  numberOfStorey: number;
  numberOfUnits: number;
  occupancyDate: string;
  maintenanceFee: number;
  pricedFrom: number;
  overViewImages: string[];
  overViewVideos: string[];
  aboutCondo: string;
  aboutImages: string[];
  aboutVideos: string[];
  featuresAndFacilities: string;
  featureImages: string[];
  featureVideos: string[];
  aboutDeveloper: string;
  developerImages: string[];
  developerVideos: string[];
  uploadedByAdmin: string;
  type: string;
  deposit: number;
  faqs: string[];
  __v: number;
}

export default function Condos({ SetCondosData }: any) {
  const [condoList, SetCondolist] = useState<condo[]>([]);

  const getAllCondos = async () => {
    try {
      const response = await axios.get("/api/v1/condos-or-projects/condos");
      console.log(response);
      SetCondolist(response?.data?.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllCondos();
  }, []);

  return (
    <>
      <div className="Heading-Container  border-red-800">
        <Heading
          SetShowbutton={SetCondosData}
          greet={"Hello Admin"}
          welcome={"Welcome to list Condos page"}
          button={" Add Condos"}
        />
      </div>

      <div className=" border-2 bg-white rounded mt-5 shadow-md border-[#C2C2C2] p-4">
        <div className=" rounded my-6 overflow-x-auto">
          <CondosCard condoList={condoList} />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
