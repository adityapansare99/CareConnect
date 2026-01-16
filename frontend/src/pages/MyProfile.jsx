import React, { useState } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const MyProfile = () => {
  const { userdata, setuserdata, token, backendurl, userprofiledata } =
    useContext(AppContext);

  const [isEdit, setisEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateprofile = async () => {
    try {
      const fromdata = new FormData();

      fromdata.append("name", userdata.name);
      fromdata.append("phone", userdata.phone);
      fromdata.append("address", JSON.stringify(userdata.address));
      fromdata.append("dob", userdata.dob);
      fromdata.append("gender", userdata.gender);

      image && fromdata.append("image", image);

      const { data } = await axios.post(
        `${backendurl}/user/update-user`,
        fromdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await userprofiledata();
        setisEdit(false);
        setImage(false);
      } else {
        toast.error(`something went wrong!`);
      }
    } catch (error) {
      toast.error(`something went wrong!`);
    }
  };

  return (
    userdata && (
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center text-2xl pt-10 text-gray-500 mb-10">
          <p className="text-3xl font-bold">
            MY <span className="text-gray-900">PROFILE</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col items-center md:items-start">
              {isEdit ? (
                <label htmlFor="image">
                  <div className="inline-block relative cursor-pointer">
                    <img
                      className="w-36 rounded opacity-75"
                      src={image ? URL.createObjectURL(image) : userdata.image}
                      alt=""
                    />
                    <img
                      className="w-10 absolute bottom-12 right-12"
                      src={image ? null : assets.upload_icon}
                      alt=""
                    />
                  </div>

                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <img className="w-36 rounded" src={userdata.image} alt="" />
              )}

              <div className="mt-6 text-center md:text-left w-full">
                {isEdit ? (
                  <input
                    className="bg-gray-50 text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-indigo-300 focus:border-indigo-600 outline-none px-2 py-1 w-full transition-all duration-300"
                    type="text"
                    value={userdata.name}
                    onChange={(e) =>
                      setuserdata((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <p className="font-bold text-2xl md:text-3xl text-gray-900">
                    {userdata.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-lg font-bold text-gray-900 mb-4">
                  Contact Information
                </p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="font-semibold text-gray-700 min-w-[120px]">
                      Email Address:
                    </p>
                    <p className="text-indigo-600">{userdata.email}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="font-semibold text-gray-700 min-w-[120px]">
                      Phone Number:
                    </p>
                    {isEdit ? (
                      <input
                        className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-300"
                        type="text"
                        value={userdata.phone}
                        onChange={(e) =>
                          setuserdata((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-gray-600">{userdata.phone}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                    <p className="font-semibold text-gray-700 min-w-[120px]">
                      Address:
                    </p>
                    {isEdit ? (
                      <div className="space-y-2 flex-1">
                        <input
                          className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-300"
                          value={userdata.address.line1}
                          onChange={(e) =>
                            setuserdata((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line1: e.target.value,
                              },
                            }))
                          }
                          type="text"
                          placeholder="Address Line 1"
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-300"
                          value={userdata.address.line2}
                          onChange={(e) =>
                            setuserdata((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line2: e.target.value,
                              },
                            }))
                          }
                          type="text"
                          placeholder="Address Line 2"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">
                        {userdata.address?.line1}
                        <br />
                        {userdata.address?.line2}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  Basic Information
                </p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="font-semibold text-gray-700 min-w-[120px]">
                      Gender:
                    </p>
                    {isEdit ? (
                      <select
                        className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-300 cursor-pointer"
                        value={userdata.gender}
                        onChange={(e) =>
                          setuserdata((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <option value="Not Selected">Not Selected</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <p className="text-gray-600">{userdata.gender}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="font-semibold text-gray-700 min-w-[120px]">
                      Date of Birth:
                    </p>
                    {isEdit ? (
                      <input
                        value={userdata.dob}
                        className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-300"
                        type="date"
                        onChange={(e) =>
                          setuserdata((prev) => ({
                            ...prev,
                            dob: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-gray-600">{userdata.dob}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4 justify-center md:justify-start">
            {isEdit ? (
              <>
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 font-medium"
                  onClick={updateprofile}
                >
                  Save Information
                </button>
                <button
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                  onClick={() => {
                    setisEdit(false);
                    setImage(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-xl"
                onClick={() => setisEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};
