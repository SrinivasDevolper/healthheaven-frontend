import React, { useEffect } from "react";
import HomePage from "../pages/HomePage";
import HomeCategoryPage from "../pages/HomeCategoryPage";
import TopDoctors from "../pages/TopDoctors";
import BannerPage from "../pages/BannerPage";
function Home() {
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
