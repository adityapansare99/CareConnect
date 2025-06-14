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
          toast.error('Unable to sign up. Please try again later.');
        }
      }

      else{
        const {data}=await axios.post(`${backendurl}/user/login`,{email,password});
        if(data.success){
          localStorage.setItem("token",data.data.token);
          settoken(data.data.token);
          toast.success(data.message);
        }
        else{
          toast.error('Unable to login. Please try again later.');
        }
      }
    } catch (error) {
      if(state === "Sign up")
      toast.error('Unable to sign up. Please try again later.');

      else{
        toast.error('Unable to login. Please try again later.');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={onsubmithandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="font-semibold text-2xl">
            {state === "Sign up" ? "Create Account" : "Login"}
          </p>
          <p>
            Please {state === "Sign up" ? " sign up" : " log in"} to book
            appointment
          </p>
          {state === "Sign up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setname(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit" className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base">
            {state === "Sign up" ? "Create Account" : "Login"}
          </button>
          {state === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setstate("Login");
                }}
                className="text-[#5f6FFF] underline cursor-pointer"
              >
                Login here
              </span>{" "}
            </p>
          ) : (
            <p>
              Create an new account?{" "}
              <span
                onClick={() => {
                  setstate("Sign up");
                }}
                className="text-[#5f6FFF] underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
