import React, { useState } from "react";
import AdminNavbar from "./Sidebar";
import { doctorsList } from "../../assets/apiAssets";
import useAdminApis from "./AdminApis";
import { DNA } from "react-loader-spinner";
import DoctorListItem from "./DoctorListItems";
function DoctorList() {
  const doctorData = useAdminApis("add-doctor");
  const { apiData } = doctorData;
  console.log(doctorData, "doctorData", apiData?.data || []);
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
          {apiData?.map((item, index) => {
            return <DoctorListItem item={item} eachId={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
