import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import mainUrl from "./MainUrl";
import Cookie from "js-cookie";
import useUserApis from "../pages/userApi";
import doctorProfile from "../../images/doctor_profile.png";
import { ToastContainer, toast } from "react-toastify";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function MyAppointment() {
  // const { doctorsList } = useContext(AppContext);
  const { email } = JSON.parse(Cookie.get("role"));
  // const JwtToken = Cookie.get("token");
  // console.log(token, "token");
  const userAPiResult = useUserApis(`user-appointments/${email}`);
  const { apiData } = userAPiResult;
  const navigate = useNavigate();
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
  const updateFetch = async (appointmentsId, status) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: status }),
    };
    try {
      const response = await fetch(
        `${mainUrl}/user-appointments/${appointmentsId}`,
        options
      );
      const data = await response.json();
      toast(data.message);
      window.location.reload();
    } catch (e) {
      toast(e.message);
    }
  };
  const onStatusUpdate = (appointmentsId, status) => {
    // console.log(appointmentsId, status, "appointmentsId");
    updateFetch(appointmentsId, status);
  };
  return (
    <div>
      <div className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        {apiData.length !== 0 ? (
          apiData.map((item, index) => {
            const { address1, address2 } = item.doctorAddress;
            return (
              <div
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                key={item.appointmentsId}
              >
                <div className="w-32 bg-teal-50">
                  <img
                    className="h-35 w-auto object-fit"
                    src={doctorProfile}
                    alt={item.doctorName}
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {item.doctorName}
                  </p>
                  <p>{item.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">address: </p>
                  <p className="text-xs">{address1}</p>
                  <p className="text-xs">{address2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm font-medium text-neutral-700">
                      Date & Time:{" "}
                    </span>
                    {item.appointmentDate} | {item.appointmentTime}
                  </p>
                  <p className="text-sm mt-1">
                    Fees:{" "}
                    <span className="text-md font-medium text-neutral-700 text-primary">
                      {item.appoitmentFees} Rs.
                    </span>
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  {item.appointmentStatus === "booked" && (
                    <>
                      <button
                        onClick={() =>
                          onStatusUpdate(item.appointmentsId, "paid")
                        }
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Pay Appointment
                      </button>
                      <button
                        onClick={() =>
                          onStatusUpdate(item.appointmentsId, "cancel")
                        }
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Cancel Appointment
                      </button>{" "}
                    </>
                  )}
                  {item.appointmentStatus === "paid" && (
                    <button className="text-sm text-white text-center bg-primary sm:min-w-48 py-2 border rounded">
                      Paid Successfully
                    </button>
                  )}
                  {item.appointmentStatus === "cancel" && (
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-red-600 text-white">
                      Appointment Canceled
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <button
              onClick={() => {
                navigate("/doctors");
                screenTop(0, 0);
              }}
              className="bg-primary text-white p-3 rounded"
            >
              Add to Appointments
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyAppointment;

// hover:bg-primary hover:text-white transition-all duration-300
