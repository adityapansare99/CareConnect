import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setstate] = useState("Admin");
  const { setatoken, backendurl } = useContext(AdminContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

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
          toast.success(data.message);
        } else {
          toast.error(data.message);
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
    <form onSubmit={onsubmithandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg">
        <p className="m-auto text-2xl font-semibold">
          <span className="text-[#5f6FFF]">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-[#5f6FFF] text-white py-2 rounded-md text-base w-full"
        >
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-[#5f6FFF] underline cursor-pointer"
              onClick={() => {
                setstate("Doctor");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-[#5f6FFF] underline cursor-pointer"
              onClick={() => {
                setstate("Admin");
              }}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
