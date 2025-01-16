import React, { useState } from "react";
import websiteLogo from "../../images/Doctor_Logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import { IoMdArrowDropdown } from "react-icons/io";
import userProfile from "../../images/userDefaultImage.png";
import Cookies from "js-cookie";
import "../app.css";
const Menu = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "All Doctors",
    path: "/doctors",
  },
  {
    id: 3,
    name: "Explore",
    path: "/explore",
  },
  {
    id: 3,
    name: "Contact Us",
    path: "/contact",
  },
];

function Headers() {
  const navigate = useNavigate();
  // const [token, setToken] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  let roles;
  if (Cookies.get("role")) {
    let { role } = JSON.parse(Cookies.get("role"));
    roles = role;
    // console.log(roles);
  }
  // console.log("roles", roles);
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Link to="/">
          <div className="flex items-center">
            <img src={websiteLogo} alt="website_logo" width="50" />
            <h1
              className="text-2xl font-bold ml-2 lg:flex hidden"
              style={{ color: "#008083" }}
            >
              Health Heaven
            </h1>
          </div>
        </Link>
        {roles === "user" && (
          <ul className="flex items-center gap-5 md:flex hidden">
            {Menu.map((eachNavItem, index) => {
              return (
                <NavLink to={eachNavItem.path} key={index}>
                  <li className="header-li transition-all ease-in-out">
                    {eachNavItem.name}
                  </li>
                  <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
                </NavLink>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex items-center gap-3">
        {roles === "user" && Cookies.get("token") ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={
                userProfile ||
                "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              alt="profile_img"
              className="w-10 h-10 rounded-full object-fit"
            />
            <IoMdArrowDropdown />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    Cookies.remove("token");
                    Cookies.remove("role");
                    navigate("/login");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {Cookies.get("token") ? (
              <button
                onClick={() => {
                  Cookies.remove("token");
                  Cookies.remove("role");
                  navigate("/login");
                }}
                style={{ backgroundColor: "#00A79C" }}
                className="p-2 px-3 rounded text-white"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                style={{ backgroundColor: "#00A79C" }}
                className="p-2 px-3 rounded text-white"
              >
                Login Account
              </button>
            )}
          </>
        )}
        {roles === "user" && (
          <>
            <img
              onClick={() => setShowMenu(true)}
              className="w-6 md:hidden"
              src="https://cdn-icons-png.flaticon.com/128/5259/5259008.png"
              alt="menuIcon"
            />
            <div
              className={`${
                showMenu ? "fixed w-full" : "h-0 w-0"
              } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
            >
              <div className="flex items-center justify-between px-5 py-6">
                <div className="flex items-center">
                  <img src={websiteLogo} alt="website_logo" width="50" />
                  <h1 className="text-2xl font-bold ml-2 lg:flex text-primary">
                    Health Heaven
                  </h1>
                </div>
                <img
                  className="w-7"
                  onClick={() => setShowMenu(false)}
                  src="https://cdn-icons-png.flaticon.com/128/9312/9312232.png"
                  alt="wrongIcon"
                />
              </div>
              <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-lg font-medium">
                <NavLink onClick={() => setShowMenu(false)} to="/">
                  <p className="px-4 py-2 rounded inline-block">HOME</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                  <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/explore">
                  <p className="px-4 py-2 rounded inline-block">EXPLORE</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/contact">
                  <p className="px-4 py-2 rounded inline-block">CONTACT</p>
                </NavLink>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Headers;
