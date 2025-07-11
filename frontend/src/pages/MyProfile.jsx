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
      <div className="max-w-lg flex flex-col gap-2 text-sm">
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

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userdata.name}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userdata.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium ">Email Id:</p>
            <p className="text-blue-500">{userdata.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userdata.phone}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400 ">{userdata.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  value={userdata.address.line1}
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-50"
                  value={userdata.address.line2}
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500 ">
                {userdata.address?.line1} <br /> {userdata.address?.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium ">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) => {
                  setuserdata((prev) => ({ ...prev, gender: e.target.value }));
                }}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userdata.gender}</p>
            )}

            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                value={userdata.dob}
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) => {
                  setuserdata((prev) => ({ ...prev, dob: e.target.value }));
                }}
              />
            ) : (
              <p className="text-gray-400">{userdata.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10 ">
          {isEdit ? (
            <button
              className="border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all"
              onClick={updateprofile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all"
              onClick={() => {
                setisEdit(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};
