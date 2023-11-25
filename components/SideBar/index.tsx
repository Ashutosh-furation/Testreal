import Image from "next/image";
import { useRouter } from "next/navigation";


export  default function SideBar({ selectedcategory, SetSelectedcategory }:any) {
   const router = useRouter()

  const handleSelectedCategory = (plan: any) => {
    SetSelectedcategory(plan);
  };

  const handleLogout = ()=>{
    localStorage.clear()
    router.push("/login")
  }

  return (
    <>
      <section className="sidebar-box w-[90%]  lg:w-[100%] min-h-screen m-auto border-red-700">
        <div className="adminlogo sm:py-2  m-auto">
          <Image
            src={"/assets/AdminLogo.svg"}
            width={80}
            height={80}
            alt="AdminLogo"
            className="m-auto"
          />
        </div>

        <div className="Sub-Categories-container relative  sm:top-[5rem] py-4 gap-5 text-white ">
          <div
            onClick={() => handleSelectedCategory("user")}
            className=" py-2 cursor-pointer border-red-600"
          >
            <p
              className={`py-2 px-4  cursor-pointer rounded-lg text-sm font-semibold
                       ${
                         selectedcategory === "user"
                           ? "text-black  bg-white"
                           : ""
                       } `}
            >
              {" "}
              Users{" "}
            </p>
          </div>
          <div
            onClick={() => handleSelectedCategory("project")}
            className="py-2 cursor-pointer border-red-600"
          >
            <p
              className={`py-2 px-4 cursor-pointer rounded-lg
                     text-sm font-semibold
                        ${
                          selectedcategory === "project"
                            ? "text-black  bg-white"
                            : ""
                        } 
                     `}
            >
              {" "}
              Projects
            </p>
          </div>
          <div
            onClick={() => handleSelectedCategory("condos")}
            className=" py-2 cursor-pointer border-red-600"
          >
            <p
              className={`py-2 px-4 cursor-pointer rounded-lg text-sm font-semibold
                     ${
                       selectedcategory === "condos"
                         ? "text-black  bg-white"
                         : ""
                     } 
                    `}
            >
              Condos
            </p>
          </div>
          <div
            onClick={() => handleSelectedCategory("Leads")}
            className=" py-2 cursor-pointer border-red-600"
          >
            <p
              className={`py-2 px-4 cursor-pointer rounded-lg text-sm font-semibold 
                     ${
                       selectedcategory === "Leads"
                         ? "text-black  bg-white"
                         : ""
                     } 
                    `}
            >
              Leads
            </p>
          </div>
        </div>

        <div
          onClick={handleLogout}
          className="Logout py-2 flex item-center justify-center relative sm:top-[10rem]"
        >
          <button
            className="text-center py-2 px-8 md:px-16  border rounded-lg 
                   text-white"
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </section>
    </>
  );
}