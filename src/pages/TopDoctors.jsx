import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import useUserApis from "./userApi";
import { DNA } from "react-loader-spinner";
import doctorProfile from "../../images/doctor_profile.png";
function TopDoctors() {
  const navigate = useNavigate();
  const { doctorsList } = useContext(AppContext);
  const userAPiResult = useUserApis("all-doctors");
  const { apiData } = userAPiResult;
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
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">
        Top <span style={{ color: "#4CC6B1" }}> Doctors </span> to Book
      </h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div
        id="speciality"
        className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0"
      >
        {apiData.slice(0, 10).map((eachDoctor, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/doctor${eachDoctor.id}`);
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
                src={eachDoctor.image || doctorProfile}
                alt={eachDoctor.name}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center">
                {eachDoctor.available ? (
                  <>
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p className="text-green-500">Available</p>
                  </>
                ) : (
                  <>
                    <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                    <p className="text-red-500">Not Available</p>
                  </>
                )}
              </div>
              <p className="text-gray-900 text-lg font-medium">
                {eachDoctor.name}
              </p>
              <p className="text-gray-600 text-sm">{eachDoctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          screenTop(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
}

export default TopDoctors;
