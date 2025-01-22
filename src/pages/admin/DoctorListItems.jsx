import React, { useState } from "react";
import useAdminApis from "./AdminApis";
import doctorProfile from "../../images/doctor_profile.png";
import mainUrl from "../../components/MainUrl";
import Cookies from "js-cookie";
function DoctorListItems({ item, eachId }) {
  //   const [availbleStatus, setAvailbiltyStatus] = useState("");
  const onClickToogle = async (e) => {
    console.log(e.target.checked);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({ available: !item.available }),
    };
    const response = await fetch(
      `${mainUrl}admin/add-doctor/${item.id}`,
      options
    );
    const data = await response.json();
    console.log(data, "dataDoctorListItems");
    window.location.reload();
  };
  return (
    <div
      className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
      key={eachId}
    >
      <img
        className="h-60 w-60 object-fit bg-[#f2ffff] group-hover:bg-primary transition-all duration-500"
        src={item.image || doctorProfile}
        alt={item.names}
      />
      <div className="p-4">
        <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
        <p className="text-neutral-600 text-sm">{item.speciality}</p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <input
            name="availability"
            id="availability"
            type="checkbox"
            checked={item.available}
            onChange={onClickToogle}
          />
          <p htmlFor="availability">Available</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorListItems;
