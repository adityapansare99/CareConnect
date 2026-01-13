import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
  const [state, setstate] = useState("Admin");
  const { setatoken, backendurl } = useContext(AdminContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { dtoken, setdtoken } = useContext(DoctorContext);

  const onsubmithandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendurl}/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("atoken", data.data.accesstoken);
          setatoken(data.data.accesstoken);
        } else {
          toast.error(
            error?.response?.data?.message || "Something went wrong!"
          );
        }
      } else {
        const { data } = await axios.post(`${backendurl}/doctors/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dtoken", data.data.token);
          setdtoken(data.data.token);
        } else {
          toast.error(
            error?.response?.data?.message || "Something went wrong!"
          );
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message || "Invalid credentials");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <img
            className="mx-auto h-12 w-auto mb-4"
            src={assets.admin_logo}
            alt="Logo"
          />
          <h2 className="text-3xl font-bold text-gray-900">
            {state} Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <form onSubmit={onsubmithandler} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Switch Login Type */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
              <button
                type="button"
                onClick={() => setstate(state === "Admin" ? "Doctor" : "Admin")}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Click here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;