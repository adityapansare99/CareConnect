import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

const DoctorProfile = () => {
  const { dtoken, getprofiledata, profileData, setprofileData,backendurl } =
    useContext(DoctorContext);

  const { currency } = useContext(AppContext);
  const [isEdit, setisEdit] = useState(false);

  const updateprofile=async()=>{
    try {
      const updateData={
        address:profileData.address,
        fees:profileData.fees,
        avaliable:profileData.avaliable
      }

      const {data}=await axios.post(`${backendurl}/doctors/update-profile`,updateData,{headers:{Authorization:`Bearer ${dtoken}`}})

      if(data.success){
        toast.success(data.message);
        setisEdit(false);
        getprofiledata();
      }
      else{
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    if (dtoken) {
      getprofiledata();
    }
  }, [dtoken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-[#5f6FFF]/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>

            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree}-{profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
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
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setprofileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setprofileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
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
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateprofile}
                className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setisEdit(true);
                }}
                className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
