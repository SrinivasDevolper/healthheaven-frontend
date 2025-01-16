import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
import verifiedIcon from "../../images/light-green-verified-icon.png";
import RelatedDoctors from "./RelatedDoctors";
import useUserApis from "./userApi";
import { DNA } from "react-loader-spinner";
import doctorProfile from "../../images/doctor_profile.png";
// import { useAuthContext } from "../context/AuthContex";
import Cookies from "js-cookie";
function Appointment() {
  // const { getToken, getRole } = useAuthContext();
  let roleJson;
  if (Cookies.get("role")) {
    roleJson = JSON.parse(Cookies.get("role"));
  }

  const userAPiResult = useUserApis("all-doctors");
  const { apiData } = userAPiResult;
  const { doctorId } = useParams();

  // const { doctorsList } = useContext(AppContext);
  const [doctorInfo, setDoctorInfo] = useState(null);
  //time slots useState
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docsSlot, setDocsSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [slotDataTime, setSlotDateTime] = useState("");
  const navigates = useNavigate();
  const fetchDocInfo = async () => {
    const docInfo = apiData.find((doc) => `doctor${doc.id}` === doctorId);
    setDoctorInfo(docInfo);
  };
  const getAvailableSlots = async () => {
    setDocsSlot([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting Date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timesSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // Add slots to array
        timesSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocsSlot((prev) => [...prev, timesSlots]);
    }
  };
  useEffect(() => {
    fetchDocInfo();
  }, [apiData, doctorId]);

  useEffect(() => {
    getAvailableSlots([]);
  }, [apiData]);

  useEffect(() => {}, [docsSlot]);

  const apiFetch = async (api, appObj) => {
    // console.log(appObj, "appObj");
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(appObj),
      };
      const response = await fetch(
        `http://localhost:4400/api/healthheaven/${api}`,
        options
      );
      const data = await response.json();
      alert("Update Successfully");
      navigates("/my-appointments");
    } catch (e) {
      console.log(e, "error");
      // alert("Please Select All");
    }
  };
  const onClickBook = (doctorId) => {
    if (!Cookies.get("token")) {
      navigates("/login");
    } else {
      const { id } = roleJson;
      const appObj = {
        user_id: id,
        doctor_id: doctorId,
        appointment_date: `${
          daysOfWeek[docsSlot[slotIndex][0].datetime.getDay()]
        }/${docsSlot[slotIndex][0].datetime.getDate()}`,
        appointment_time: slotTime,
        status: "booked",
      };
      if (slotIndex === "" || slotTime === "") {
        alert("Please Select Slot time");
        return;
      }
      apiFetch("user-appointments", appObj);
    }
  };

  if (userAPiResult.loading) {
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
  if (userAPiResult.error.status) {
    return (
      <div>
        <h1 className="text-red-500 font-bold">*{userAPiResult.error.msg}</h1>
      </div>
    );
  }
  return (
    doctorInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={doctorInfo.image || doctorProfile}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInfo.name}{" "}
              <img className="w-5" src={verifiedIcon} alt="verifiedIcon" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.degree} - {doctorInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img
                  src="https://img.icons8.com/?size=256&id=59817&format=png"
                  alt="infoicon"
                  className="w-4"
                />
              </p>
              <p className="text-sm text-gray-500 mx-w-[700px] mt-1">
                {doctorInfo.about}
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mx-w-[700px] mt-1 italic">
                  <span className="font-bold text-gray-900">Address1:</span>{" "}
                  {doctorInfo.address.address1}
                </p>
                <p className="text-sm text-gray-500 mx-w-[700px] mt-1 italic">
                  <span className="font-bold text-gray-900">Address1:</span>{" "}
                  Address2: {doctorInfo.address.address1}
                </p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-primary">Rs. {doctorInfo.fees}</span>
              </p>
            </div>
          </div>
        </div>
        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-fray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docsSlot.length &&
              docsSlot.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    } `}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docsSlot.length &&
              docsSlot[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm, font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          {doctorInfo.available ? (
            <button
              onClick={() => onClickBook(doctorInfo.id)}
              className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:scale-95 hover:text-teal-200 transition-all ease-in-out duration-500"
            >
              Book an appointment
            </button>
          ) : (
            <div className="flex items-center gap-2 mt-5">
              <p className="text-red-500">* Not Available</p>
            </div>
          )}
        </div>
        <RelatedDoctors doctorId={doctorId} specialty={doctorInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
