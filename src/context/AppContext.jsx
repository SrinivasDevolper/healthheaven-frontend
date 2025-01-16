import { createContext } from "react";
import { doctorsList } from "../assets/apiAssets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // console.log("hello");
  const value = {
    doctorsList,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
