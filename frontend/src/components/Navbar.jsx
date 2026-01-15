import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, settoken, userdata } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    settoken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 px-2 mb-5 border-b border-gray-200 bg-white sticky top-0 z-50">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/">
          {({ isActive }) => (
            <li className="py-1 relative group">
              <span className={`${isActive ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 transition-colors`}>
                HOME
              </span>
              <hr className={`${isActive ? 'block' : 'hidden'} border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto mt-1`} />
            </li>
          )}
        </NavLink>
        <NavLink to="/doctors">
          {({ isActive }) => (
            <li className="py-1 relative group">
              <span className={`${isActive ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 transition-colors`}>
                ALL DOCTORS
              </span>
              <hr className={`${isActive ? 'block' : 'hidden'} border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto mt-1`} />
            </li>
          )}
        </NavLink>
        <NavLink to="/about">
          {({ isActive }) => (
            <li className="py-1 relative group">
              <span className={`${isActive ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 transition-colors`}>
                ABOUT
              </span>
              <hr className={`${isActive ? 'block' : 'hidden'} border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto mt-1`} />
            </li>
          )}
        </NavLink>
        <NavLink to="/contact">
          {({ isActive }) => (
            <li className="py-1 relative group">
              <span className={`${isActive ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 transition-colors`}>
                CONTACT
              </span>
              <hr className={`${isActive ? 'block' : 'hidden'} border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto mt-1`} />
            </li>
          )}
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              src={token ? userdata.image : assets.profile_pic}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col gap-1 p-2">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer px-4 py-2 rounded-md transition-colors"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer px-4 py-2 rounded-md transition-colors"
                >
                  My Appointments
                </p>
                <hr className="my-1 border-gray-200" />
                <p 
                  onClick={logout} 
                  className="hover:bg-red-50 hover:text-red-600 cursor-pointer px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-white bg-indigo-600 px-8 py-3 rounded-full font-medium hidden md:block hover:bg-indigo-700 transition-colors"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu Overlay */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
            <img
              onClick={() => setShowMenu(false)}
              className="w-36 cursor-pointer"
              src={assets.logo}
              alt="Logo"
            />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
            >
              {({ isActive }) => (
                <p className={`px-4 py-2 rounded-md ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'} hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}>
                  Home
                </p>
              )}
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
            >
              {({ isActive }) => (
                <p className={`px-4 py-2 rounded-md ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'} hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}>
                  All Doctors
                </p>
              )}
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              {({ isActive }) => (
                <p className={`px-4 py-2 rounded-md ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'} hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}>
                  About
                </p>
              )}
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              {({ isActive }) => (
                <p className={`px-4 py-2 rounded-md ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'} hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}>
                  Contact
                </p>
              )}
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;