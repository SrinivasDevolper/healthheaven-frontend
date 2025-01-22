import { useEffect, useState } from "react";
import mainUrl from "../components/MainUrl";
import Cookies from "js-cookie";
const useUserApis = (api) => {
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
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    try {
      const response = await fetch(`${mainUrl}${api}`);
      const data = await response.json();
      // console.log(response, data, "response");
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
      // console.log(error, "error", error.SyntaxError);
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
  useEffect(() => {
    fetchAdminData();
    //   console.log(adminData, "adminData");
  }, [api]);
  return adminData;
};

export default useUserApis;
