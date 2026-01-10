import React, { useContext } from "react";
import "./index.css";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointmnet from "./pages/Admin/AllAppointmnet";
import AddDoctor from "./pages/Admin/AddDoctor";
import Doctorlist from "./pages/Admin/Doctorlist";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointmetns from "./pages/Doctor/DoctorAppointmetns";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  const NAVBAR_HEIGHT = "64px";

  if (!atoken && !dtoken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="h-screen bg-[#F8F9FD] overflow-hidden">
      <ToastContainer />
      <Navbar />
      <div
        className="flex"
        style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }}
      >
        <SideBar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointmnet />} />
            <Route path="/add-doctors" element={<AddDoctor />} />
            <Route path="/doctors-list" element={<Doctorlist />} />

            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointmetns />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
