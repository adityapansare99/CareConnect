import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className={`lg:hidden ${
          isMobileMenuOpen ? "hidden" : ""
        } fixed top-19 right-4 z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors`}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
        ></div>
      )}

      <div
        className={`fixed top-16 w-full lg:w-72 h-[calc(100vh-64px)] lg:static lg:h-auto z-40 bg-white border-r
  transform transition-transform duration-300 ease-in-out
  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
      >
        <div className="h-[8vh] border-b lg:hidden border-gray-200 flex items-center justify-between px-6 py-4 relative">
          <button
          onClick={closeMobileMenu}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        </div>

        {atoken && (
          <ul className="text-gray-700 mt-2">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/admin-dashboard"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.home_icon} alt="" />
              </div>
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/all-appointments"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
              </div>
              <p>Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/add-doctors"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.add_icon} alt="" />
              </div>
              <p>Add Doctor</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/doctors-list"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.people_icon} alt="" />
              </div>
              <p>Doctors List</p>
            </NavLink>
          </ul>
        )}

        {dtoken && (
          <ul className="text-gray-700 mt-2">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/doctor-dashboard"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.home_icon} alt="" />
              </div>
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/doctor-appointments"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
              </div>
              <p>Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-6 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                    : "hover:bg-gray-50"
                }`
              }
              to={"/doctor-profile"}
              onClick={closeMobileMenu}
            >
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <img className="w-5 h-5" src={assets.people_icon} alt="" />
              </div>
              <p>Profile</p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default SideBar;