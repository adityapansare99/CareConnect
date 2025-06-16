import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointmnet = () => {
  const { getallappointments, allappointments, atoken, cancelAppointment } =
    useContext(AdminContext);

  const { calculateage, dateformat, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getallappointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {allappointments.map((item, index) => (
          <div
            className="hover:bg-gray-50 grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] max-sm:flex max-sm:flex-wrap justify-between max-sm:gap-2 items-center py-3 px-6 text-gray-500 border-b cursor-pointer"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateage(item.userData.dob)}</p>
            <p>
              {dateformat(item.slotDate)} & {item.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt=""
              />
              <p>{item.docData.name}</p>
            </div>

            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 font-medium text-xs">Cancelled</p>
            ) : item.isComplete ? <p className="font-medium text-xs text-green-500">Completed</p> : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointmnet;
