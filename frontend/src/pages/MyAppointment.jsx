import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { getdocdata, backendurl, token } = useContext(AppContext);
  const [appointment, setappointment] = useState([]);
  const navigate = useNavigate();

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateformat = (slotDate) => {
    const datearray = slotDate.split("_");
    return (
      datearray[0] + " " + months[Number(datearray[1])] + " " + datearray[2]
    );
  };

  const getappointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/user/get-appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setappointment(data.data.reverse());
        toast.success(data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const cancelappointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendurl}/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getappointments();
        getdocdata();
      } else {
        toast.error(response.data.message || "something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RazorPayKey,
      amount: order.amount,
      currency: order.currency,
      name: "CareConnect",
      description: "CareConnect Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data}=await axios.post(`${backendurl}/user/verify-payment`,{razorpay_order_id:response.razorpay_order_id},{headers:{Authorization:`Bearer ${token}`}});

          if(data.success){
            toast.success(data.message);
            getappointments();
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentrazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/user/payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        initpay(data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      getappointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointment
      </p>
      <div>
        {appointment.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality} </p>
              <p className="text-zinc-700 mt-1 font-medium">Address: </p>
              <p className="text-xs">{item.docData.address?.line1} </p>
              <p className="text-xs">{item.docData.address?.line2} </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time
                </span>{" "}
                {dateformat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {
                !item.cancelled && item.payment && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>
                )
              }
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => appointmentrazorpay(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && (
                <button
                  onClick={() => cancelappointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
