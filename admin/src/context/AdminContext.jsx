import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [docdata, setdocdata] = useState([]);
  const [atoken, setatoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [allappointments, setallappointments] = useState([]);
  const [dashboarddata, setdashboarddata] = useState(false);

  const alldoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/admin/all-doctors`,
        {},
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if (data.success) {
        setdocdata(data.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const changestatus = async (docid) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/admin/change-available`,
        { docid },
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        alldoctors();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const getallappointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/admin/all-appointments`, {
        headers: { Authorization: `Bearer ${atoken}` },
      });

      if (data.success) {
        toast.success(data.message);
        setallappointments(data.data);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/admin/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getallappointments();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const dashData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${atoken}` },
      });

      if (data.success) {
        setdashboarddata(data.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const value = {
    atoken,
    setatoken,
    backendurl,
    docdata,
    alldoctors,
    changestatus,
    getallappointments,
    setallappointments,
    allappointments,
    cancelAppointment,
    dashData,
    dashboarddata,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
