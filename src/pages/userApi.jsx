import { useEffect, useState, useCallback } from "react";
import mainUrl from "../components/MainUrl";
import Cookies from "js-cookie";

const useUserApis = (api) => {
  const [adminData, setAdminData] = useState({
    apiData: [],
    loading: false,
    error: { msg: "", status: false },
  });

  // Function to fetch data
  const fetchAdminData = useCallback(async () => {
    setAdminData((prevState) => ({
      ...prevState,
      loading: true,
      error: { msg: "", status: false },
    }));

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    try {
      const response = await fetch(`${mainUrl}${api}`, options);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();

      setAdminData({
        apiData: data,
        loading: false,
        error: { msg: "", status: false },
      });
    } catch (error) {
      setAdminData({
        apiData: [],
        loading: false,
        error: { msg: "Something went wrong", status: true },
      });
    }
  }, [api]);

  // Fetch data on component mount or when `api` changes
  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Return adminData and refetch method
  return { adminData, refetch: fetchAdminData };
};

export default useUserApis;
