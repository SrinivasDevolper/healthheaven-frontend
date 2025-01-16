import React from "react";
import { SpecialistData } from "../assets/apiAssets";
import { Link } from "react-router-dom";

function HomeCategoryPage() {
  return (
    <div className="mt-10 mb-10 flex flex-col items-center flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Find by <span style={{ color: "#4CC6B1" }}>Speciality</span>
      </h2>
      <p className="text-gray-500 text-xl sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-auto text-center">
        {SpecialistData.map((eachItem, index) => (
          <Link
            key={index}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            to={`/doctors/${eachItem.speciality}`}
          >
            <div className="bg-gradient-to-br from-white via-[#9ad6d4] to-[#55ABAA] rounded-full h-24 w-24 flex items-center justify-center object-fill">
              <img
                className="w-16 sm:w-30 mb-2"
                src={eachItem.imgUrl}
                alt={eachItem.speciality}
              />
            </div>
            <p>{eachItem.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeCategoryPage;
