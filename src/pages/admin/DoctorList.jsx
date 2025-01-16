import React, { useState } from "react";
import AdminNavbar from "./Sidebar";
import { doctorsList } from "../../assets/apiAssets";
import useAdminApis from "./AdminApis";
import { DNA } from "react-loader-spinner";
import DoctorListItem from "./DoctorListItems";
function DoctorList() {
  const doctorData = useAdminApis("add-doctor");
  // const [] = useState({ id: "", available: "" });
  if (doctorData.loading) {
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
  if (doctorData.error.status) {
    return (
      <div>
        <h1 className="text-red-500 font-bold">
          *{adminAppointments.error.msg}
        </h1>
      </div>
    );
  }
  return (
    <div className="flex items-start">
      <AdminNavbar />
      <div className="mt-3 ml-5 max-h-[90vh] overflow-y-scroll">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctorData.apiData.map((item, index) => {
            return <DoctorListItem item={item} eachId={index} />;
          })}
        </div>
        {/* <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctorsList.slice(0, 10).map((eachDoctor, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${eachDoctor.id}`);
                scrollTo(0, 0);
              }}
              className="border border-primary-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <div
                style={{ backgroundColor: "#f2ffff" }}
                className="flex items-center justify-center"
              >
                <img
                  className="h-60 w-auto object-fit"
                  src={eachDoctor.image}
                  alt={eachDoctor.names}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {eachDoctor.names}
                </p>
                <p className="text-gray-600 text-sm">{eachDoctor.specialty}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default DoctorList;
