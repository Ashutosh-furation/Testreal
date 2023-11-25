import Image from "next/image";

export default function CondosForm() {

  return (
    <>
      <div className="max-w-7xl border-red-800">
        <div className="Top-Heading flex justify-between px-2  border-green-900">
          <div className="admin">
            <h2 className="text-2xl py-2 font-semibold">New Condos</h2>
            <p className="text-[#707070] py-1 font-semibold text-lg">
              Add your new Condos here
            </p>
          </div>
        </div>

        <hr className="border mt-5 px-2 border-black" />

        <div className=" mt-5 py-2 px-2  m-auto border-yellow-500">
          <section className="Overview-Container  border-green-800 ">
            <div className="px-4 py-2 gap-2 flex">
              <p className="bg-black text-white rounded-full  px-2 "> 1 </p>
              <h1 className="font-semibold">Overview </h1>
            </div>

            <div className="Project-container py-2  border-green-900">
              <div className="container-box  px-2  flex flex-col sm:flex-row sm:justify-between   border-pink-800">
                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Project Name *{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder="Type your condo here"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>

                <div className="sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">Description* </label>
                  <div className="py-2">
                    <input
                      placeholder="Add a clear & short description about the condo"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>
              </div>

              {/*** */}
              <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between     border-pink-800">
                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Developer Name *{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder=" Developer Name "
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>

                <div className="sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">Address* </label>
                  <div className="py-2">
                    <input
                      placeholder="Enter your Address"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>
              </div>

              {/*** */}

              <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Neighbourhood * *{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder="Neighbourhood"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>

                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Number of Storeys *{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder="Number of Storeys"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>
              </div>

              {/*** */}
              <div className="container-box px-2  flex flex-col sm:flex-row sm:justify-between     border-pink-800">
                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Number of Units *{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder="Number of Units"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>

                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Occupancy Date **{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder="Occupancy Date"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>
              </div>

              {/*** */}
              <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                <div className=" sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">
                    Maintenance Fees *{" "}
                  </label>
                  <div className="py-2">
                    <input
                      placeholder="Maintenance Fees"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>

                <div className="sm:w-[50%] px-2 border-green-700">
                  <label className="font-semibold text-sm">Priced From* </label>
                  <div className="py-2">
                    <input
                      placeholder="Priced From"
                      className="border border-grey text-sm rounded py-2 px-2 w-[100%] "
                    />
                  </div>
                </div>
              </div>
              {/*** */}
              <div className="container-box px-2  flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">
                    Add images/videos*{" "}
                  </label>

                  <div className="py-8 mt-5 bg-[#EEEEEE] border-2 border-dashed border-[#C2C2C2] rounded-lg h-[30vh] w-[100%]">
                    <label className=" border-green-700">
                      <input
                        type="file"
                        placeholder="Maintenance Fees"
                        className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                      />
                      <div
                        className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                      >
                        <Image
                          src={"/assets/image.svg"}
                          alt="imagelogo"
                          width={50}
                          height={50}
                          className="m-auto"
                        />
                      </div>
                    </label>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    SVG, PNG or JPG{" "}
                  </h2>
                </div>
              </div>

              {/*** */}
            </div>
          </section>

          {/*** About project */}
          <hr className="border mt-5 px-2 border-black" />

          <section className="About-Container mt-5 border-green-800 ">
            <div className="px-4 py-2 gap-2 flex">
              <p className="bg-black text-white rounded-full  px-2 "> 2 </p>
              <h1 className="font-semibold"> About Project </h1>
            </div>

            <div className="AboutProject-container py-2  border-green-900">
              <div className="container-box px-2 flex flex-col sm:justify-between   border-pink-800">
                <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">About *</label>

                  <div className="mt-2 w-[100%]">
                    <textarea
                      id="note"
                      className="w-full h-44 px-4 py-4  text-gray-700 border rounded-lg 
                            "
                      placeholder="Type about your condo here..."
                    ></textarea>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    250 characters max
                  </h2>
                </div>

                <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">
                    Add images/videos*{" "}
                  </label>

                  <div className="py-8 mt-2 bg-[#EEEEEE] border-2 border-dashed border-[#C2C2C2] rounded-lg h-[30vh] w-[100%]">
                    <label className=" border-green-700">
                      <input
                        type="file"
                        placeholder="Maintenance Fees"
                        className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                      />
                      <div
                        className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                      >
                        <Image
                          src={"/assets/image.svg"}
                          alt="imagelogo"
                          width={50}
                          height={50}
                          className="m-auto"
                        />
                      </div>
                    </label>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    SVG, PNG or JPG{" "}
                  </h2>
                </div>
              </div>

              {/*** */}
            </div>
          </section>

          <hr className="border mt-5 px-2 border-black" />

          {/** Features & Finishes  */}

          <section className="Features-Container mt-5 border-green-800 ">
            <div className="px-4 py-2 gap-2 flex">
              <p className="bg-black text-white rounded-full  px-2 "> 3 </p>
              <h1 className="font-semibold"> Features & Finishes </h1>
            </div>

            <div className="AboutProject-container py-2  border-green-900">
              <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between     border-pink-800">
                <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">
                    Features & Finishes *
                  </label>

                  <div className="mt-2 w-[100%]">
                    <textarea
                      id="note"
                      className="w-full h-44 px-4 py-4  text-gray-700 border rounded-lg "
                      placeholder="Type about your features & finishes here ..."
                    ></textarea>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    250 characters max
                  </h2>
                </div>

                <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">
                    Add images/videos*{" "}
                  </label>

                  <div className="py-8 mt-2 bg-[#EEEEEE] border-2 border-dashed border-[#C2C2C2] rounded-lg h-[30vh] w-[100%]">
                    <label className=" border-green-700">
                      <input
                        type="file"
                        placeholder="Maintenance Fees"
                        className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                      />
                      <div
                        className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                      >
                        <Image
                          src={"/assets/image.svg"}
                          alt="imagelogo"
                          width={50}
                          height={50}
                          className="m-auto"
                        />
                      </div>
                    </label>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    SVG, PNG or JPG{" "}
                  </h2>
                </div>
              </div>

              {/*** */}
            </div>
          </section>

          {/*** About Develeper */}
          <hr className="border mt-5 px-2 border-black" />

          <section className="Features-Container mt-5 border-green-800 ">
            <div className="px-4 py-2 gap-2 flex">
              <p className="bg-black text-white rounded-full  px-2 "> 4 </p>
              <h1 className="font-semibold"> About Developer </h1>
            </div>

            <div className="AboutProject-container py-2  border-green-900">
              <div className="container-box px-2  flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">
                    About Developer *
                  </label>

                  <div className="mt-2 w-[100%]">
                    <textarea
                      id="note"
                      className="w-full h-44 px-4 py-4  text-gray-700 border rounded-lg "
                      placeholder="Type about your About Developer here ..."
                    ></textarea>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    250 characters max
                  </h2>
                </div>

                <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                  <label className="font-semibold py-2 text-sm">
                    Add images/videos*{" "}
                  </label>

                  <div className="py-8 mt-2 bg-[#EEEEEE] border-2 border-dashed border-[#C2C2C2] rounded-lg h-[30vh] w-[100%]">
                    <label className=" border-green-700">
                      <input
                        type="file"
                        placeholder="Maintenance Fees"
                        className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                      />
                      <div
                        className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                      >
                        <Image
                          src={"/assets/image.svg"}
                          alt="imagelogo"
                          width={50}
                          height={50}
                          className="m-auto"
                        />
                      </div>
                    </label>
                  </div>
                  <h2 className="py-2 px-2 text-sm text-[#707070]">
                    {" "}
                    SVG, PNG or JPG{" "}
                  </h2>
                </div>
              </div>

              {/*** */}
            </div>
          </section>

          <div className="w-[100%]  m-auto flex justify-center items-center">
            <button className="cursor-pointer  text-center rounded bg-black py-2 px-6 text-white">
              {" "}
              Add Projects{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
