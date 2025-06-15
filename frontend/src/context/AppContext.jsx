import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const currency = "₹";

  const [doctors, setdoctors] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  const [userdata,setuserdata]=useState(false);

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

  const userprofiledata=async()=>{
    try {
     const {data}=await axios.get(`${backendurl}/user/user-profile`,{headers:{Authorization:`Bearer ${token}`}})

     if(data.success){
      setuserdata(data.data);
      toast.success(data.message);
     }

     else{
      toast.error("Something went wrong!");
     }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    getdocdata();
  }, []);

  useEffect(() => {
    if(token)
    userprofiledata();
  }, [token]);

  const value = {
    doctors,
    getdocdata,
    currency,
    token,
    settoken,
    backendurl,
    userdata,
    setuserdata,
    userprofiledata
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
