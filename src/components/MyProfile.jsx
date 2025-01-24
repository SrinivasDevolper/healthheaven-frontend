import React, { useState } from "react";
import useUserApis from "../pages/userApi";
import userProfileImg from "../images/userDefaultImage.png";
import { DNA } from "react-loader-spinner";
import Cookies from "js-cookie";
const MyProfile = () => {
  let emails;
  if (Cookies.get("role")) {
    const { email } = JSON.parse(Cookies.get("role"));
    emails = email;
  }
  console.log(emails);
  const { adminData } = useUserApis(`user-profile/${emails}`);
  const { apiData } = adminData;
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  if (adminData.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }
  if (adminData.error.status) {
    return (
      <div>
        <h1 className="text-red-500 font-bold">*{adminData.error.msg}</h1>
      </div>
    );
  }
  return (
    <>
      {apiData.map((eachProfile) => (
        <div
          key={eachProfile.id}
          className="max-lg flex flex-col gap-2 text-sm mt-5 border border-gray-400 p-8 max-w-md w-full flex items-center rounded"
        >
          <img
            className="w-36 h-36 rounded-full"
            src={eachProfile.image || userProfileImg}
            alt={eachProfile.name}
          />
          <div className="flex item-center gap-5 mt-3 text-neutral-500">
            <p className="font-medium">Name :</p>
            <p className="text-teal-500">{eachProfile.name}</p>
          </div>
          <div className="flex item-center gap-2 mt-3 text-neutral-500">
            <p className="font-medium">Email:</p>
            <p className="text-teal-500">{eachProfile.email}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MyProfile;
