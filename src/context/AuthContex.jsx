import React, { useContext } from "react";
import Cookies from "js-cookie";
const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  let getToken = Cookies.get("token");
  let getRole = Cookies.get("role");

  return (
    <AuthContext.Provider value={[getToken, getRole]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const [getToken, getRole] = useContext(AuthContext);
  let parseRole;
  if (getRole) {
    parseRole = JSON.parse(getRole);
    // console.log("role", parseRole);
  }
  return { getToken, parseRole };
};
