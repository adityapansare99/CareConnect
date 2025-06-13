import React, { use, useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const {atoken,setatoken}=useContext(AdminContext)
    const navigate=useNavigate();

    const logout=()=>{
        navigate('/')
        atoken && setatoken('')
        atoken && localStorage.removeItem('atoken')
    }
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs ">
        <img className="-mt-1.5 w-40 sm:w-44 cursor-pointer" src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
            {
                atoken?'Admin':'Doctor'
            }
        </p>
      </div>

      <button onClick={logout} className="bg-[#5F6FFF] text-white  text-sm px-10 py-2 rounded-full">Logout</button>
    </div>
  );
};

export default Navbar;
