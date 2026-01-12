import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dtoken, getprofiledata, profileData, setprofileData, backendurl } =
    useContext(DoctorContext);

  const { currency } = useContext(AppContext);
  const [isEdit, setisEdit] = useState(false);

  const updateprofile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        avaliable: profileData.avaliable,
      };

      const { data } = await axios.post(
        `${backendurl}/doctors/update-profile`,
        updateData,
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setisEdit(false);
        getprofiledata();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (dtoken) {
      getprofiledata();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="w-full p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            Doctor Profile
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your professional information</p>
        </div>

        {/* Profile Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-8">
            {/* Left Column - Profile Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  className="w-100 h-100 rounded-2xl object-cover aspect-square border-4 border-indigo-100 shadow-lg"
                  src={profileData.image}
                  alt={profileData.name}
                />
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  {profileData.avaliable ? (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500 text-white shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
                      Offline
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Name and Credentials */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                    {profileData.degree}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                    {profileData.speciality}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profileData.experience}
                  </span>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{profileData.about}</p>
              </div>

              {/* Consultation Fee */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">Consultation Fee:</span>
                  </div>
                  <div>
                    {isEdit ? (
                      <input
                        type="number"
                        onChange={(e) =>
                          setprofileData((prev) => ({
                            ...prev,
                            fees: e.target.value,
                          }))
                        }
                        value={profileData.fees}
                        className="px-3 py-1.5 border border-green-300 rounded-lg text-lg font-bold text-green-700 w-32 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-green-700">
                        {currency}{profileData.fees}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Address
                </h3>
                <div className="space-y-2">
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) =>
                          setprofileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        value={profileData.address.line1}
                        placeholder="Street Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      />
                      <input
                        type="text"
                        onChange={(e) =>
                          setprofileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        value={profileData.address.line2}
                        placeholder="City, State, ZIP"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      />
                    </>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p>{profileData.address.line1}</p>
                      <p>{profileData.address.line2}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">Availability Status</span>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      onChange={() =>
                        isEdit &&
                        setprofileData((prev) => ({
                          ...prev,
                          avaliable: !prev.avaliable,
                        }))
                      }
                      checked={profileData.avaliable}
                      type="checkbox"
                      className="sr-only peer"
                      disabled={!isEdit}
                    />
                    <div className={`w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 ${!isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {profileData.avaliable ? 'Available' : 'Unavailable'}
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {isEdit ? (
                  <>
                    <button
                      onClick={updateprofile}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setisEdit(false);
                        getprofiledata();
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold border border-gray-300 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setisEdit(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;