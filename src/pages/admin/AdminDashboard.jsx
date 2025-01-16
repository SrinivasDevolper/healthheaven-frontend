import React from "react";
import AdminNavbar from "./Sidebar";
import search from "../../../images/search.gif";
import peoples from "../../../images/peoples.png";
import playList from "../../../images/playList.png";
import useAdminApis from "./AdminApis";
import { DNA } from "react-loader-spinner";
import axios from "axios";
function AdminDashboard() {
  const adminAppointments = useAdminApis("admin-appointment");
  const { apiData } = useAdminApis("all-appointment");
  const adminPatient = useAdminApis("patient-count");
  const adminDoctors = useAdminApis("doctors-count");
  if (adminAppointments.loading) {
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
  if (adminAppointments.error.status) {
    return (
      <div>
        <h1 className="text-red-500 font-bold">
          *{adminAppointments.error.msg}
        </h1>
      </div>
    );
  }
  const deleteAppiontemtId = async (id) => {
    // console.log(eachId, "eachId");
    try {
      const response = await axios.delete(
        `http://localhost:4400/api/healthheaven/admin/admin-appointment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjAwNjI1MH0.uv91ghCwcpufTFe2pxH5wNUkpyXrAeZi97W0kGIr40g`,
          },
          // params: { id: eachId },
        }
      );
      alert("Delete Successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-start">
      <AdminNavbar />
      <div className="ml-5 mt-5">
        <div className="sm:flex-col lg:flex md:flex-row items-center gap-10">
          <div className="flex items-center p-3 rounded shadow mb-5">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5996/5996258.png"
              alt="doctorsIcon"
              className="bg-[#f0fcf9] rounded p-3 mr-5 w-20"
            />
            <div>
              <p className="text-3xl">{adminDoctors.apiData.length}</p>
              <h1 className="text-[#8893b0] text-xl">Doctors</h1>
            </div>
          </div>
          <div className="flex items-center p-3 rounded shadow mb-5">
            <img
              src={search}
              alt=""
              className="bg-[#f0fcf9] rounded p-3 mr-5 w-20"
            />
            <div>
              <p className="text-3xl">{apiData.length}</p>
              <h1 className="text-[#8893b0] text-xl">Appointments</h1>
            </div>
          </div>
          <div className="flex items-center p-3 rounded shadow mb-5">
            <img
              className="bg-[#f0fcf9] rounded p-3 mr-5 w-20"
              src={peoples}
              alt=""
            />
            <div>
              <p className="text-3xl">{adminPatient.apiData.length}</p>
              <h1 className="text-[#8893b0] text-xl">patient</h1>
            </div>
          </div>
        </div>
        <div className="border-gray-200 border p-2 rounded">
          <div className="flex flex-row items-center gap-3 font-semibold">
            <img className="w-10" src={playList} alt="" />
            <h1 className="text-xl">Latest Appointment</h1>
          </div>
          <hr />
          <ul class="relative overflow-x-auto mt-2">
            {adminAppointments.apiData.map((eachData, index) => {
              const { id } = eachData;
              return (
                <li
                  key={index}
                  className="flex flex-col sm:flex-col md:flex-row justify-between items-center"
                >
                  <div className="flex flex-col sm:flex-col md:flex-row justify-between items-center gap-5">
                    <img
                      src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                      alt=""
                      className="w-16 h-16 object-cover	rounded-full"
                    />
                    <div className="sm: text-center md:text-start mt-5 mb-5">
                      <h1 className="text-xl">{eachData.name}</h1>
                      <p className="text-gray-500">
                        Booking on {eachData.appointment_time}{" "}
                        {eachData.appointment_date}
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full h-10 w-10 flex items-center justify-center">
                    <button
                      className="text-red-500"
                      onClick={() => deleteAppiontemtId(id)}
                    >
                      X
                    </button>
                  </div>
                  <hr />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
