export default function UserListCard({ userlist, SetUserlist }: any) {
  const handleStatusToggle = (index: any) => {
    const updatedUserList = [...userlist];
    updatedUserList[index].isActive = !updatedUserList[index].isActive;
    SetUserlist(updatedUserList);
  };

  return (
    <>
      <table className="min-w-full border border-black rounded  overflow-scroll">
        <thead>
          <tr className="text-xs sm:text-sm">
            <th className="text-left py-2 px-3">S.No</th>
            <th className="text-left py-2 px-3">Name</th>
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm border-green-800">
          {userlist.length > 0 &&
            userlist.map((user: any, index: any) => (
              <tr
                key={index}
                className="hover:bg-[#EBEBEB] cursor-pointer border-red-800"
              >
                <td className="text-left py-2 px-1 sm:px-3">{index + 1}</td>
                <td className="text-left py-2 px-1 sm:px-3">{user.name}</td>
                <td className="text-left py-2 px-1 sm:px-3">{user.email}</td>
                <td className="text-left py-2 px-1 sm:px-3">
                  <div className="md:w-2/3 w-full">
                    <p className="font-light text-sm md:text-base flex justify-between">
                      <button
                        onClick={() => handleStatusToggle(index)}
                        className={`relative flex items-center h-6 w-12 sm:w-16 lg:h-6 lg:w-12 rounded-full transition duration-300 ease-in-out ${
                          user.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform transform duration-300 ease-in-out ${
                            user.isActive ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></div>
                      </button>
                    </p>
                  </div>
                </td>
                <td className="text-center font-semibold cursor-pointer py-2 px-3">
                  Edit
                </td>
                <td className="text-center font-semibold cursor-pointer py-2 px-3">
                  Delete
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

 // const handleImageChange = async (e, key) => {
  //   const selectedFiles = e.target.files;
  //   const formDataCopy = { ...formData }; // Copy the existing form data
  //   console.log("fomdardataaaa========",formData)
  //   // Iterate through selected files
  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     const selectedFile = selectedFiles[i];
  //      console.log("Slected =========== file", selectedFile )
  //     // Implement the logic to get presigned URL and upload to AWS for each file
  //     const payloadImage = {
  //       fileType: selectedFile.name,
  //     };
  //     console.log("payloadimage========",payloadImage)
  //     const action = await GetpresignedurlData(payloadImage)(dispatch);
  //      console.log("Preurl===========",action)
  //     const preurl = action?.payload?.uploadUrl;

  //     // Upload the selected file to AWS

  //     const res = await UpdatedAwsPost(preurl, selectedFile)(dispatch);
  //       console.log("res===aws image", res)
  //     const uploadedImageUrl = action?.payload?.uploadUrl.split("?")[0];

  //      console.log("awsurlimage for setin formdata=======",uploadedImageUrl)

  //     // Store the uploaded image URL in the respective form data field (identified by key)
  //     if (!formDataCopy[key]) {
  //       formDataCopy[key] = [uploadedImageUrl]; // Initialize as an array for the first image
  //     } else {
  //       formDataCopy[key].push(uploadedImageUrl); // Add subsequent image URLs to the array
  //     }
  //   }
  //   // Update the state with the modified form data
  //   setFormData(formDataCopy);
  // };
