import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const navigate = useNavigate();
  const { dtoken, setdtoken } = useContext(DoctorContext);

  const logout = () => {
    navigate("/");
    atoken && setatoken("");
    atoken && localStorage.removeItem("atoken");

    dtoken && setdtoken("");
    dtoken && localStorage.removeItem("dtoken");
  };

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            className="h-8 sm:h-10 w-auto cursor-pointer"
            src={assets.admin_logo}
            alt="Logo"
          />
          <div className="flex items-center gap-2">
            {atoken ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Admin
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78-.03 1.632.572 2.234A3.989 3.989 0 006 16a3.989 3.989 0 001.246-1.94c.602-.602.822-1.455.572-2.234L7 9.274V6a1 1 0 00-2 0v3.274z" />
                </svg>
                Doctor
              </span>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm sm:text-base font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;