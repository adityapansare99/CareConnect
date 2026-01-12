import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointmetns = () => {
  const {
    dtoken,
    getAppointments,
    appointments,
    completeappointment,
    cancelappointment,
  } = useContext(DoctorContext);
  const { calculateage, dateformat, currency } = useContext(AppContext);
  
  useEffect(() => {
    if (dtoken) getAppointments();
  }, [dtoken]);

  return (
    <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              All Appointments
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Manage your patient appointments</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-2xl font-bold text-indigo-600">{appointments.length}</p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header - Desktop */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] bg-gradient-to-r from-gray-50 to-white py-4 px-6 border-b border-gray-200 font-semibold text-gray-700 text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                className="hover:bg-gray-50 grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] max-sm:flex max-sm:flex-col max-sm:gap-3 items-center py-4 px-6 text-gray-600 border-b border-gray-100 transition-colors duration-200 group"
                key={index}
              >
                {/* Index */}
                <p className="max-sm:hidden text-gray-400 font-medium">{index + 1}</p>

                {/* Patient Info */}
                <div className="flex items-center gap-3 max-sm:w-full">
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-300 transition-colors"
                      src={item.userData.image}
                      alt=""
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.userData.name}</p>
                    <p className="text-xs text-gray-500 sm:hidden">Age: {calculateage(item.userData.dob)}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="max-sm:w-full">
                  {item.payment ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Cash
                    </span>
                  )}
                </div>

                {/* Age - Desktop Only */}
                <p className="max-sm:hidden">
                  <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700">
                    {calculateage(item.userData.dob)} yrs
                  </span>
                </p>

                {/* Date & Time */}
                <div className="max-sm:w-full">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-gray-700">{dateformat(item.slotDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1 ml-6">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{item.slotTime}</span>
                  </div>
                </div>

                {/* Fees */}
                <div className="max-sm:w-full">
                  <p className="font-bold text-green-600 text-lg">
                    {currency}{item.amount}
                  </p>
                </div>

                {/* Actions */}
                <div className="max-sm:w-full">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                      <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Cancelled
                    </span>
                  ) : item.isComplete ? (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                      <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Completed
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => cancelappointment(item._id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all duration-200"
                        title="Cancel Appointment"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => completeappointment(item._id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 transition-all duration-200"
                        title="Complete Appointment"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium text-lg">No appointments found</p>
              <p className="text-gray-400 text-sm mt-2">Appointments will appear here once patients book</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmetns;