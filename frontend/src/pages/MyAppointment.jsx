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
          const { data } = await axios.post(
            `${backendurl}/user/verify-payment`,
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            toast.success(data.message);
            getappointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message || "Something went wrong!"
          );
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
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      getappointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center text-2xl pt-10 text-gray-500 mb-10">
        <p className="text-3xl font-bold">
          MY <span className="text-gray-900">APPOINTMENTS</span>
        </p>
      </div>

      <div className="space-y-6 pb-16">
        {appointment.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No appointments found</p>
            <p className="text-gray-400 text-sm mt-2">
              Book an appointment to see it here
            </p>
          </div>
        ) : (
          appointment.map((item, index) => (
            <div
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              key={index}
            >
              <div className="flex flex-col sm:flex-row gap-6 p-6">
                <div className="flex-shrink-0">
                  <img
                    className="w-32 h-32 object-cover rounded-xl bg-indigo-50 shadow-md"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {item.docData.name}
                    </p>
                    <p className="text-sm text-indigo-600 font-medium">
                      {item.docData.speciality}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700">
                      Address:
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.docData.address?.line1}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.docData.address?.line2}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Date & Time:
                    </span>
                    <span className="text-sm text-gray-600">
                      {dateformat(item.slotDate)} | {item.slotTime}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-center sm:min-w-[200px]">
                  {!item.cancelled && item.payment && (
                    <button className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-green-50 text-green-600 border border-green-200">
                      Paid
                    </button>
                  )}
                  {item.isComplete && (
                    <button className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-green-50 text-green-600 border border-green-500">
                      Appointment Completed
                    </button>
                  )}
                  {!item.cancelled && !item.payment && !item.isComplete && (
                    <button
                      onClick={() => appointmentrazorpay(item._id)}
                      className="w-full py-3 px-4 rounded-lg text-sm font-medium border border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.isComplete && (
                    <button
                      onClick={() => cancelappointment(item._id)}
                      className="w-full py-3 px-4 rounded-lg text-sm font-medium border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      Cancel Appointment
                    </button>
                  )}

                  {item.cancelled && (
                    <button className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-500 cursor-not-allowed">
                      Appointment Cancelled
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Appointment ID: {item._id?.slice(-8).toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      item.cancelled
                        ? "bg-red-100 text-red-700"
                        : item.isComplete
                        ? "bg-green-100 text-green-700"
                        : item.payment
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.cancelled
                      ? "Cancelled"
                      : item.isComplete
                      ? "Completed"
                      : item.payment
                      ? "Confirmed"
                      : "Pending Payment"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointment;