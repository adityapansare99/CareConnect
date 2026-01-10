import React, { use, useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { atoken, cancelAppointment, dashboarddata, dashData } =
    useContext(AdminContext);

  const { dateformat } = useContext(AppContext);
  
  useEffect(() => {
    if (atoken) dashData();
  }, [atoken]);

  useEffect(() => {
    
  }, [dashboarddata]);

  return (
    dashboarddata && (
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Welcome back! Here's your overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-blue-600 text-xs sm:text-sm font-medium mb-1">Total Doctors</p>
                <p className="text-3xl sm:text-4xl font-bold text-blue-900">
                  {dashboarddata.doctors}
                </p>
                <p className="text-blue-600 text-xs mt-2">Active practitioners</p>
              </div>
              <div className="bg-blue-200 p-3 sm:p-4 rounded-full flex-shrink-0">
                <img className="w-10 h-10 sm:w-12 sm:h-12" src={assets.doctor_icon} alt="" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-purple-600 text-xs sm:text-sm font-medium mb-1">Appointments</p>
                <p className="text-3xl sm:text-4xl font-bold text-purple-900">
                  {dashboarddata.appointments}
                </p>
                <p className="text-purple-600 text-xs mt-2">Total bookings</p>
              </div>
              <div className="bg-purple-200 p-3 sm:p-4 rounded-full flex-shrink-0">
                <img className="w-10 h-10 sm:w-12 sm:h-12" src={assets.appointments_icon} alt="" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-green-600 text-xs sm:text-sm font-medium mb-1">Total Patients</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-900">
                  {dashboarddata.users}
                </p>
                <p className="text-green-600 text-xs mt-2">Registered users</p>
              </div>
              <div className="bg-green-200 p-3 sm:p-4 rounded-full flex-shrink-0">
                <img className="w-10 h-10 sm:w-12 sm:h-12" src={assets.patients_icon} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <img className="w-4 h-4 sm:w-5 sm:h-5" src={assets.list_icon} alt="" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Latest Appointments</h2>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Recent booking activity</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {dashboarddata.latestAppointment.length > 0 ? (
              dashboarddata.latestAppointment.map((item, index) => (
                <div
                  className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors duration-200 group"
                  key={index}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-300 transition-colors"
                        src={item.docData.image}
                        alt=""
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        {item.docData.name}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{dateformat(item.slotDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center flex-shrink-0">
                      {item.cancelled ? (
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                          <svg className="w-3 h-3 sm:mr-1.5 hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Cancelled</span>
                          <span className="sm:hidden">✕</span>
                        </span>
                      ) : item.isComplete ? (
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                          <svg className="w-3 h-3 sm:mr-1.5 hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Completed</span>
                          <span className="sm:hidden">✓</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all duration-200"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="hidden sm:inline">Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base">No appointments yet</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Appointments will appear here when booked</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;