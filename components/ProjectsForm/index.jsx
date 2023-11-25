import {
  GetpresignedurlData,
  Projectcreatepost,
  UpdatedAwsPost,
} from "@/Redux/AppReducer/Action";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Toast from "../Toast/Toast";
import toast, { Toaster } from "react-hot-toast";
import CustomInput from "./index";

export default function ProjectsForm() {
  const dispatch = useDispatch();
  const [image, SetImage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    developerName: "",
    address: "",
    city: "",
    country: "mumbai",
    landmark: "dadar",
    numberOfStorey: "",
    numberOfUnits: "",
    occupancyDate: "",
    maintenanceFee: "",
    pricedFrom: "",
    overViewImages: "",
    overViewVideos: "aman",
    aboutCondo: "",
    aboutImages: "",
    aboutVideos: "aman",
    featuresAndFacilities: "",
    featureImages: "",
    featureVideos: "aman",
    aboutDeveloper: "",
    developerImages: "",
    developerVideos: "aman",
    question: "",
    answer: "",
    attachments: "",
    type: "project",
    deposit: "500000",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value.trim(), // Set error to true if the value is empty
    }));
  };
  console.log("fomrdata========================", formData);
  // console.log("imagesaws",image)

  const handleImageChange = async (e, key) => {
    const selectedFiles = e.target.files;
    const formDataCopy = { ...formData }; // Copy the existing form data
    console.log("fomdardataaaa========", formData);
    // Iterate through selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      console.log("Slected =========== file", selectedFile);
      // Implement the logic to get presigned URL and upload to AWS for each file
      const payloadImage = {
        fileType: selectedFile.name,
      };
      console.log("payloadimage========", payloadImage);
      const action = await GetpresignedurlData(payloadImage)(dispatch);
      console.log("Preurl===========", action);
      const preurl = action?.payload?.uploadUrl;

      // Upload the selected file to AWS

      const res = await UpdatedAwsPost(preurl, selectedFile)(dispatch);
      console.log("res===aws image", res);
      const uploadedImageUrl = action?.payload?.uploadUrl.split("?")[0];

      console.log("awsurlimage for setin formdata=======", uploadedImageUrl);

      // Store the uploaded image URL in the respective form data field (identified by key)
      if (!formDataCopy[key]) {
        formDataCopy[key] = [uploadedImageUrl]; // Initialize as an array for the first image
      } else {
        formDataCopy[key].push(uploadedImageUrl); // Add subsequent image URLs to the array
      }
    }
    // Update the state with the modified form data
    setFormData(formDataCopy);
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // Perform file upload-related actions here
      // For instance, you can upload the file to a server
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    // const emptyFields = Object.keys(formData).reduce((acc, key) => {
    //   if (!formData[key]) {
    //     return { ...acc, [key]: true };
    //   }
    //   // return acc;
    //   return { ...acc, [key]: false };
    // }, {});
    
    const updatedErrors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) {
        return { ...acc, [key]: true }; // Field is empty, set error to true
      }
      return { ...acc, [key]: false }; // Field is filled, set error to false
    }, {});

    setErrors(updatedErrors);

    if (Object.keys(updatedErrors).length > 0) {
      setErrors(updatedErrors);
      return;
    } else {
      setErrors({});
    }
    // Clear errors if there are no empty fields
    setErrors({});

    Projectcreatepost(formData)(dispatch)
      .then((res) => {
        console.log("res=======", res);
        if (res.type === "UPDATEDIMAGESAWS_DATA_SUCESS") {
          toast.success("new Project created succesfully");
          setFormData({
            name: "",
            shortDescription: "",
            developerName: "",
            address: "",
            city: "",
            country: "",
            landmark: "",
            numberOfStorey: "",
            numberOfUnits: "",
            occupancyDate: "",
            maintenanceFee: "",
            pricedFrom: "",
            overViewImages: "",
            overViewVideos: "",
            aboutCondo: "",
            aboutImages: "",
            aboutVideos: "",
            featuresAndFacilities: "",
            featureImages: "",
            featureVideos: "",
            aboutDeveloper: "",
            developerImages: "",
            developerVideos: "",
            type: "",
            deposit: "",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div className="max-w-7xl border-red-800">
        <div className="Top-Heading flex justify-between px-2  border-green-900">
          <div className="admin">
            <h2 className="text-2xl py-2 font-semibold">New Projects</h2>
            <p className="text-[#707070] py-1 font-semibold text-lg">
              Add your new projects here
            </p>
          </div>
        </div>

        <hr className="border mt-5 px-2 border-black" />

        <form onSubmit={handleCreateProject}>
          <div className="Main-container mt-5 py-2 px-2  m-auto border-yellow-500">
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
                        onChange={handleInputChange}
                        name="name"
                        value={formData.name}
                        placeholder={"Type your project here" || formData.name}
                        className={`border-2 ${
                          errors["name"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["name"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a name
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Description*{" "}
                    </label>
                    <div className="py-2">
                      <input
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        placeholder="Add a clear & short description about the condo"
                        className={`border-2 ${
                          errors["shortDescription"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["shortDescription"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a shortDescription
                        </p>
                      )}
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
                        type="text"
                        name="developerName"
                        value={formData.developerName}
                        onChange={handleInputChange}
                        placeholder=" Developer Name "
                        className={`border-2 ${
                          errors["developerName"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["name"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a name
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">Address* </label>
                    <div className="py-2">
                      <input
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your Address"
                        className={`border-2 ${
                          errors["address"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["address"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Address
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}

                <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Neighbourhood *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        name="city"
                        value={formData.city}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Neighbourhood"
                        className={`border-2 ${
                          errors["city"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["city"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Neighbourhood
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Number of Storeys *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        type="text"
                        name="numberOfStorey"
                        value={formData.numberOfStorey}
                        onChange={handleInputChange}
                        placeholder="Number of Storeys"
                        className={`border-2 ${
                          errors["numberOfStorey"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["numberOfStorey"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a numberOfStorey
                        </p>
                      )}
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
                        name="numberOfUnits"
                        type="Number"
                        value={formData.numberOfUnits}
                        onChange={handleInputChange}
                        placeholder="Number of Units"
                        className={`border-2 ${
                          errors["numberOfUnits"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["numberOfUnits"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a numberOfUnits
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Occupancy Date **{" "}
                    </label>
                    <div className="py-2">
                      <input
                        type="date"
                        name="occupancyDate"
                        value={formData.occupancyDate}
                        onChange={handleInputChange}
                        placeholder="Occupancy Date"
                        className={`border-2 ${
                          errors["occupancyDate"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["occupancyDate"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a occupancyDate
                        </p>
                      )}
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
                        type="Number"
                        name="maintenanceFee"
                        value={formData.maintenanceFee}
                        onChange={handleInputChange}
                        placeholder="Maintenance Fees"
                        className={`border-2 ${
                          errors["maintenanceFee"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["maintenanceFee"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a maintenanceFee
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Priced From*{" "}
                    </label>
                    <div className="py-2">
                      <input
                        value={formData.pricedFrom}
                        name="pricedFrom"
                        type="Number"
                        onChange={handleInputChange}
                        placeholder="Priced From"
                        className={`border-2 ${
                          errors["pricedFrom"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["pricedFrom"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Priced
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/*** */}
                <div className="container-box px-2  flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      Add images/videos*{" "}
                    </label>

                    <div
                      className={`border-2 ${
                        errors["overViewImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-[30vh] w-[100%]`}
                      // className="py-8 mt-5 bg-[#EEEEEE] border-2 border-dashed border-[#C2C2C2] rounded-lg h-[30vh] w-[100%]"
                    >
                      <label className=" border-green-700">
                        <input
                          onChange={(e) =>
                            handleImageChange(e, "overViewImages")
                          }
                          type="file"
                          placeholder="overview images"
                          className="border border-grey text-sm
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
                        />
                        {/* {errors["overViewImages"] && (
                          <p className="text-red-500 text-sm mt-1">
                            Please Select images
                          </p>
                        )} */}
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
                    {errors["maintenanceFee"] && (
                      <p className="text-red-500 text-sm mt-1">Select Image</p>
                    )}
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
                <div className="container-box  px-2 flex flex-col sm:flex-row sm:justify-between border-pink-800">
                  <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      About *
                    </label>

                    <div className="mt-5  w-[100%]">
                      {/* <textarea
                        type="text"
                        onChange={handleInputChange}
                        name="aboutCondo"
                        value={formData.aboutCondo}
                        id="note"
                        className={`border-2 ${
                          errors["aboutCondo"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg `}
                        // className="w-full h-44 px-4 py-4  text-gray-700 border rounded-lg
                        //     "
                        placeholder="Type about your condo here..."
                      ></textarea> */}
                      <textarea
                        type="text"
                        onChange={handleInputChange}
                        name="aboutCondo"
                        value={formData.aboutCondo}
                        id="note"
                        className={`border-2 ${
                          errors["aboutCondo"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg flex justify-center items-center`}
                        placeholder="Type about your condo here..."
                      ></textarea>

                      {errors["aboutCondo"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a AboutCondo
                        </p>
                      )}
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

                    <div
                      className={`border-2 ${
                        errors["aboutImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-44 w-[100%]`}
                    >
                      <label className=" border-green-700">
                        {/* <input
                          onChange={(e) => handleImageChange(e, "aboutImages")}
                          type="file"
                          placeholder="aboutImages"
                          className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
                        /> */}
                        <input
                          onChange={(e) => handleImageChange(e, "aboutImages")}
                          type="file"
                          placeholder="aboutImages"
                          className="border border-grey text-sm hidden rounded py-2 px-2 w-[100%]  justify-center items-center"
                          multiple
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
                    {errors["aboutImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select Image</p>
                    )}
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

                    <div className="mt-5 w-[100%]">
                      <textarea
                        type="text"
                        value={formData.featuresAndFacilities}
                        name="featuresAndFacilities"
                        onChange={handleInputChange}
                        id="note"
                        className={`border-2 ${
                          errors["featuresAndFacilities"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg `}
                        placeholder="Type about your features & finishes here ..."
                      ></textarea>
                      {errors["featuresAndFacilities"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a featuresAndFacilities
                        </p>
                      )}
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

                    <div
                      className={`border-2 ${
                        errors["featureImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-[30vh] w-[100%]`}
                    >
                      <label className=" border-green-700">
                        <input
                          onChange={(e) =>
                            handleImageChange(e, "featureImages")
                          }
                          type="file"
                          placeholder="featureImages"
                          className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
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
                    {errors["featureImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select images</p>
                    )}
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

                    <div className="mt-5 w-[100%]">
                      <textarea
                        type="text"
                        value={formData.aboutDeveloper}
                        name="aboutDeveloper"
                        onChange={handleInputChange}
                        id="note"
                        className={`border-2 ${
                          errors["aboutDeveloper"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg `}
                        placeholder="Type about your About Developer here ..."
                      ></textarea>
                      {errors["aboutDeveloper"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a AboutDeveloper
                        </p>
                      )}
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

                    <div
                      className={`border-2 ${
                        errors["developerImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-[30vh] w-[100%]`}
                    >
                      {" "}
                      <label className=" border-green-700">
                        <input
                          onChange={(e) =>
                            handleImageChange(e, "developerImages")
                          }
                          // value={formData}
                          type="file"
                          placeholder="developer Images"
                          className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
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
                    {errors["developerImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select image</p>
                    )}
                    <h2 className="py-2 px-2 text-sm text-[#707070]">
                      {" "}
                      SVG, PNG or JPG{" "}
                    </h2>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/************* Upload files **************** */}
            <hr className="border mt-5 px-2 border-black" />

            <section className="Features-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 5 </p>
                <h1 className="font-semibold"> Upload Files </h1>
              </div>

              <div className="Uploadfile-container rounded py-2 border border-grey">
                <div className="Uploadfile-box  px-2  flex flex-col sm:flex-row sm:justify-between   border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Add Title *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        onChange={handleInputChange}
                        name="title"
                        // value={formData.title}
                        placeholder={
                          "Add a title for the uploaded file" || formData.title
                        }
                        className={`border-2 ${
                          errors["title"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {/* {errors["title"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Title
                        </p>
                      )} */}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Upload Attachment*{" "}
                    </label>
                    <div className="py-2 relative">
                      <span className="absolute left-3 top-4">
                        <Image
                          src="assets/pdficon.svg"
                          alt="Icon"
                          width={20}
                          height={20}
                          className="m-auto"
                        />
                      </span>
                      <input
                        type="file"
                        name="fileUpload"
                        accept=".pdf"
                        onChange={(e) => handleImageChange(e, "attachments")}
                        placeholder="Click here to upload a file"
                        className="pl-8 border border-grey text-sm  rounded py-2 px-2 w-[100%]"
                      />
                    </div>
                    <p className="px-2 text-[.7rem] text-[#707070]">
                      {" "}
                      PDF file is supported{" "}
                    </p>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/************* FAQ Questions **************** */}
            <hr className="border mt-5 px-2 border-black" />

            <section className="Features-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 6 </p>
                <h1 className="font-semibold"> FAQs </h1>
              </div>

              <div className="Uploadfile-container rounded py-2 border border-grey">
                <div className="Uploadfile-box  px-2  flex flex-col  border-pink-800">
                  <div className="  px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Question 1 *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        onChange={handleInputChange}
                        name="question"
                        value={formData.question}
                        placeholder={"Type questions here" || formData.question}
                        className={`border-2 ${
                          errors["question"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["question"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Questions
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" px-2 border-green-700">
                    <label className="font-semibold text-sm">Answer 1* </label>
                    <div className="py-2 relative">
                      <input
                        type="text"
                        name="answer"
                        onChange={handleInputChange}
                        value={formData.answer}
                        placeholder="Type answer here"
                        className={`border-2 ${
                          errors["answer"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["answer"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Answer
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            <div
              onClick={handleCreateProject}
              className="w-[100%] py-2 m-auto flex justify-center items-center"
            >
              <button className="cursor-pointer  text-center rounded bg-black py-2 px-6 text-white">
                {" "}
                Add Projects{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
