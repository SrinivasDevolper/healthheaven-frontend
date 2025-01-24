import React, { useState } from "react";
import doctorProfile from "../../images/doctor_profile.png";
import mainUrl from "../../components/MainUrl";
import Cookies from "js-cookie";

function DoctorListItems({ item, eachId }) {
  const [available, setAvailable] = useState(item.available);

  const onClickToggle = async (e) => {
    const newStatus = !available; // Calculate the new availability status
    setAvailable(newStatus); // Update the local state immediately for frontend responsiveness

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({ available: newStatus }),
    };

    try {
      const response = await fetch(
        `${mainUrl}admin/add-doctor/${item.id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to update availability status");
      }

      const data = await response.json();
      console.log("Backend update successful:", data);
    } catch (error) {
      console.error(error);
      // Revert the state if the API request fails
      setAvailable(!newStatus);
    }
  };

  return (
    <div
      className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
      key={eachId}
    >
      <img
        className="h-60 w-60 object-fit bg-[#f2ffff] group-hover:bg-primary transition-all duration-500"
        src={item.image || doctorProfile}
        alt={item.name}
      />
      <div className="p-4">
        <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
        <p className="text-neutral-600 text-sm">{item.speciality}</p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <input
            name="availability"
            id="availability"
            type="checkbox"
            checked={available}
            onChange={onClickToggle}
          />
          <label htmlFor="availability">Available</label>
        </div>
      </div>
    </div>
  );
}

export default DoctorListItems;
