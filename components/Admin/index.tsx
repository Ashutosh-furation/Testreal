import { useState } from "react";
import UsersList from "../UsersList";
import Projects from "../Projects";
import ProjectsForm from "../ProjectsForm";
import Condos from "../Condos";
import CondosForm from "../CondosForm/CondosForm";
import Leads from "../Leads";





export default function AdminPage({ selectedcategory, SetSelectedcategory }: any) {
  const [ProjectData, SetProjectsData] = useState<boolean>(true);
  const [CondosData, SetCondosData] = useState<boolean>(true);

  return (
    <>
      <section className="Admin-Box border-2 py-2  w-[100%] px-1 sm:px-2 m-auto min-h-screen border-green-800">
        {selectedcategory === "user" && (
          <div className=" border-red-600 py-1 sm:py-2 min-h-screen">
            <UsersList />
          </div>
        )}

        {selectedcategory === "project" && ProjectData && (
          <div className=" border-red-600  py-1 sm:py-2 min-h-screen">
            <Projects SetProjectsData={SetProjectsData} />
          </div>
        )}

        {selectedcategory === "project" && !ProjectData && (
          <div className=" border-red-600  py-1 sm:py-2 min-h-screen">
            <ProjectsForm />
          </div>
        )}

        {selectedcategory === "condos" && CondosData && (
          <div className=" border-red-600 py-1 sm:py-2 min-h-screen">
            <Condos SetCondosData={SetCondosData} />
          </div>
        )}

        {selectedcategory === "condos" && !CondosData && (
          <div className=" border-red-600  py-1 sm:py-2 min-h-screen">
            <CondosForm />
          </div>
        )}

        {selectedcategory === "Leads" && (
          <div className=" border-red-600  py-1 sm:py-2 min-h-screen">
            <Leads />
          </div>
        )}
      </section>
    </>
  );
}