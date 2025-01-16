import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="min-h-screen bg-white border-r ">
      <ul className="text-[#515151] mt-5">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#f2fcfc] border-r-4 border-primary" : ""
            }`
          }
        >
          <li className="flex items-center">
            <img
              src="https://static.thenounproject.com/png/423483-200.png"
              alt="homeicon"
              className="h-10 w-10 object-fit mr-3 min-w-5"
            />
            <p className="hidden md:block">Dashboard</p>
          </li>
        </NavLink>
        <NavLink
          to="/all-appointments"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#f2fcfc] border-r-4 border-primary" : ""
            }`
          }
        >
          <li className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/508/508867.png"
              alt="appointment icon"
              className="h-8 w-8 object-fit mr-3 min-w-5"
            />
            <p className="hidden md:block">Appointments</p>
          </li>
        </NavLink>
        <NavLink
          to="/add-doctors"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#f2fcfc] border-r-4 border-primary" : ""
            }`
          }
        >
          <li className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
              alt="add icons"
              className="h-8 w-8 object-fit mr-3 min-w-5"
            />
            <p className="hidden md:block">Add Doctor</p>
          </li>
        </NavLink>
        <NavLink
          to="/all-doctors"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#f2fcfc] border-r-4 border-primary" : ""
            }`
          }
        >
          <li className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4726/4726440.png"
              alt="doctor icons"
              className="h-10 w-10 object-fit mr-3 min-w-5"
            />
            <p className="hidden md:block">Doctor List</p>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminNavbar;
