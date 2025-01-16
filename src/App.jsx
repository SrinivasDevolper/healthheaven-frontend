import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Home from "./components/Home";
import DoctorsSpeciality from "./pages/DoctorsSpeciality";
import Appointment from "./pages/Appointment";
import Explore from "./components/Explore";
import Contact from "./components/Contact";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import MyAppointment from "./components/MyAppointment";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctors from "./pages/admin/AddDoctors";
import DoctorList from "./pages/admin/DoctorList";
import Footer from "./components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
import "./app.css";
import Cookies from "js-cookie";
import NotFound from "./components/NotFound";
function ProtectedRoute({ children, adminRole }) {
  if (Cookie.get("token") === undefined) {
    return children;
  } else {
    return adminRole === "admin" ? (
      <Navigate to="/admin-dashboard" />
    ) : (
      <Navigate to="/" />
    );
  }
}
function RoleProtectedRoute({ children, adminRole }) {
  if (adminRole === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
let getRole;
if (Cookies.get("role")) {
  const { role } = JSON.parse(Cookie.get("role"));
  getRole = role;
}

function App() {
  return (
    <div className="md:px-20 px-5">
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorsSpeciality />} />
        <Route path="/doctors/:speciality" element={<DoctorsSpeciality />} />
        <Route path="/appointment/:doctorId" element={<Appointment />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute adminRole={getRole}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route
          path="/admin-dashboard"
          element={
            <RoleProtectedRoute adminRole={getRole}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/all-appointments"
          element={
            <RoleProtectedRoute adminRole={getRole}>
              <AllAppointments />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/add-doctors"
          element={
            <RoleProtectedRoute adminRole={getRole}>
              <AddDoctors />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/all-doctors"
          element={
            <RoleProtectedRoute adminRole={getRole}>
              <DoctorList />
            </RoleProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
