import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
function ProtectedRoute() {
  const jwtToken = Cookie.get("token");
  console.log(jwtToken, "ProtectedRoute.jsx");
  return jwtToken && <Navigate to="/" />;
}

export default ProtectedRoute;
