import React, { useContext } from "react";
import "./index.css";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/navbar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointmnet from "./pages/Admin/AllAppointmnet";
import AddDoctor from "./pages/Admin/AddDoctor";
import Doctorlist from "./pages/Admin/Doctorlist";

const App = () => {
  const { atoken } = useContext(AdminContext);

  return atoken ? (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
      <SideBar/>
      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/all-appointments' element={<AllAppointmnet/>}/>
        <Route path='/add-doctors' element={<AddDoctor/>}/>
        <Route path='/doctors-list' element={<Doctorlist/>}/>
      </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
