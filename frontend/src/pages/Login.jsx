import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, settoken, backendurl } = useContext(AppContext);
  const [state, setstate] = useState("Sign up");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign up") {
        const { data } = await axios.post(`${backendurl}/user/register`, {
          email,
          password,
          name,
        });
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          settoken(data.data.token);
          toast.success(data.message);
        } else {
          toast.error("Unable to sign up. Please try again later.");
        }
      } else {
        const { data } = await axios.post(`${backendurl}/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          settoken(data.data.token);
          toast.success(data.message);
        } else {
          toast.error("Unable to login. Please try again later.");
        }
      }
    } catch (error) {
      if (state === "Sign up")
        toast.error("Unable to sign up. Please try again later.");
      else {
        toast.error("Unable to login. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {state === "Sign up" ? (
              <>
                Create <span className="text-indigo-600">Account</span>
              </>
            ) : (
              <>
                Welcome <span className="text-indigo-600">Back</span>
              </>
            )}
          </h1>
          <p className="text-gray-600 text-sm">
            {state === "Sign up"
              ? "Sign up to book your appointment with top doctors"
              : "Login to manage your appointments and health records"}
          </p>
        </div>

        <form onSubmit={onsubmithandler}>
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {state === "Sign up" && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
                  type="text"
                  placeholder="Enter your full name"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {state === "Sign up" ? "Create Account" : "Login"}
            </button>

            <div className="text-center pt-2">
              {state === "Sign up" ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={() => setstate("Login")}
                    className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer underline"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setstate("Sign up")}
                    className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer underline"
                  >
                    Sign up here
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;