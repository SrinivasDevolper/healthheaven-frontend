import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import useUserApis from "./userApi";
import { DNA } from "react-loader-spinner";
import doctorProfile from "../images/doctor_profile.png";
function DoctorsSpeciality() {
  const { speciality } = useParams();
  // console.log(speciality, "specialty");
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctorsList } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const userAPiResult = useUserApis("all-doctors");
  const { apiData } = userAPiResult;
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(apiData.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(apiData);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [apiData, speciality]);
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
    <div className="mt-5">
      <p className="text-gray-600">Browser Through the doctors Specailist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatology"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatology")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatology" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatology
          </p>
          <p
            onClick={() =>
              speciality === "Cardiologist"
                ? navigate("/doctors")
                : navigate("/doctors/Cardiologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Cardiologist
          </p>
          <p
            onClick={() =>
              speciality === "Endocrinologist"
                ? navigate("/doctors")
                : navigate("/doctors/Endocrinologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Endocrinologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Endocrinologist
          </p>
          <p
            onClick={() =>
              speciality === "Nephrologist"
                ? navigate("/doctors")
                : navigate("/doctors/Nephrologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Nephrologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Nephrologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatrics"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatrics")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatrics" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatrics
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-3 sm:px-0">
          {filterDoc.map((eachDoctor, index) => (
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
      </div>
    </div>
  );
}

export default DoctorsSpeciality;
