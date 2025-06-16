import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dtoken, setdtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [appointments, setappointments] = useState([]);
  const [dashData, setdashData] = useState(false);
  const currency = "₹";

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/doctors/doc-appointments`,
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        setappointments(data.data.reverse());
        console.log(data.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  const completeappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/doctors/completed-appointment`,
        { appointmentId: appointmentId },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const cancelappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/doctors/cancel-appointment`,
        { appointmentId: appointmentId },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const getdashData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/doctors/dashboard`, {
        headers: { Authorization: `Bearer ${dtoken}` },
      });

      if (data.success) {
        setdashData(data.data);
      } else {
        toast.error(error?.response?.data?.message ||"Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ||"Something went wrong!");
    }
  };

  const value = {
    dtoken,
    setdtoken,
    backendurl,
    getAppointments,
    appointments,
    setappointments,
    completeappointment,
    cancelappointment,
    getdashData,
    setdashData,
    dashData,
    currency
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
