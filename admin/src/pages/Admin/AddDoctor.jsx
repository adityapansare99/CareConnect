import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [education, setEducation] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");

  const { atoken, backendurl } = useContext(AdminContext);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        return toast.error("Please upload an image");
      }

      const form = {
        name,
        email,
        password,
        experience,
        fees,
        about,
        speciality,
        degree: education,
        address: { line1: address1, line2: address2 },
      };

      const formdata = new FormData();

      formdata.append("image", image);
      formdata.append("data", JSON.stringify(form));

      const { data } = await axios.post(
        `${backendurl}/admin/add-doctor`,
        formdata,
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          Add New Doctor
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Fill in the details to register a new doctor
        </p>
      </div>

      <form
        onSubmit={submithandler}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 sm:p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              id="doc-img"
              hidden
            />
            <p>
              Upload Doctor <br /> Picture
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  type="text"
                  placeholder="Dr. John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  type="email"
                  placeholder="doctor@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience <span className="text-red-500">*</span>
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Years</option>
                  <option value="3 Year">3 Years</option>
                  <option value="4 Year">4 Years</option>
                  <option value="5 Year">5 Years</option>
                  <option value="6 Year">6 Years</option>
                  <option value="7 Year">7 Years</option>
                  <option value="8 Year">8 Years</option>
                  <option value="9 Year">9 Years</option>
                  <option value="10 Year">10 Years</option>
                  <option value="11 Year">11+ Years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Consultation Fees <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <input
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    type="number"
                    placeholder="50"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Speciality <span className="text-red-500">*</span>
                </label>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="General physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Education <span className="text-red-500">*</span>
                </label>
                <input
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  type="text"
                  placeholder="MBBS, MD"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  value={address1}
                  onChange={(e) => setaddress1(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none mb-3"
                  type="text"
                  placeholder="Street Address"
                  required
                />
                <input
                  value={address2}
                  onChange={(e) => setaddress2(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  type="text"
                  placeholder="City, State, ZIP"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              About Doctor <span className="text-red-500">*</span>
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
              placeholder="Write a brief description about the doctor's expertise and background..."
              rows={5}
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Required fields
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
