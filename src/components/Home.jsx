import React from "react";
import HomePage from "../pages/HomePage";
import HomeCategoryPage from "../pages/HomeCategoryPage";
import TopDoctors from "../pages/TopDoctors";
import BannerPage from "../pages/BannerPage";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
// let getRole;
// if (Cookie.get("role")) {
//   const { role } = JSON.parse(Cookie.get("role"));
//   getRole = role;
// }

function Home() {
  // if (getRole === "admin") {
  //   return <Navigate to="/admin-dashboard" />;
  // }
  return (
    <div>
      <HomePage />
      <HomeCategoryPage />
      <TopDoctors />
      <BannerPage />
    </div>
  );
}

export default Home;
