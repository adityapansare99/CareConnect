import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";

  const [doctors, setdoctors] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");

  const getdocdata = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/doctors/getalldoctors`);

      if (data.success) {
        setdoctors(data.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getdocdata();
  }, []);

  const value = {
    doctors,
    currency,
    getdocdata,
    token,
    settoken,
    backendurl
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
