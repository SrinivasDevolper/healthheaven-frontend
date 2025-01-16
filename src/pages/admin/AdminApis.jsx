import { useEffect, useState } from "react";
import Cookie from "js-cookie";
const useAdminApis = (api) => {
  console.log(api, "api");
  const [adminData, setAdminData] = useState({
    apiData: [],
    loading: false,
    error: {
      msg: "",
      status: false,
    },
  });
  const fetchAdminData = async () => {
    setAdminData({
      ...adminData,
      apiData: [],
      loading: true,
      error: {
        msg: "",
        status: false,
      },
    });
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    };
    try {
      const response = await fetch(
        `http://localhost:4400/api/healthheaven/admin/${api}`,
        options
      );
      const data = await response.json();
      console.log(response, data, "response");
      setAdminData({
        ...adminData,
        apiData: data,
        loading: false,
        error: {
          msg: "",
          status: false,
        },
      });
    } catch (error) {
      console.log(error, "error", error.SyntaxError);
      setAdminData({
        ...adminData,
        apiData: [],
        loading: false,
        error: {
          msg: "Something Is Error",
          status: true,
        },
      });
    }
  };
  useEffect(
    () => {
      fetchAdminData();
      console.log(adminData, "adminData");
    },
    adminData,
    api
  );
  return adminData;
};

export default useAdminApis;
