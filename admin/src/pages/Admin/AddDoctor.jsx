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

      const formdata=new FormData();

      formdata.append("image",image);
      formdata.append("data",JSON.stringify(form));

      const { data } = await axios.post(
        `${backendurl}/admin/add-doctor`,
        formdata,
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if(data.success){
        toast.success(data.message);
        // setName("");
        // setEmail("");
        // setPassword("");
        // setExperience("1 Year");
        // setFees("");
        // setAbout("");
        // setSpeciality("General Physician");
        // setEducation("");
        // setaddress1("");
        // setaddress2("");
        // setImage(false);
      }

      else{
        toast.error('Something went wrong!');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <form onSubmit={submithandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="mg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
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

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                className="border rounded px-3 py-2"
                name=""
                id="experience"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="11 Year">11 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                value={fees}
                onChange={(e) => {
                  setFees(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => {
                  setSpeciality(e.target.value);
                }}
                className="border rounded px-3 py-2"
                name=""
                id="speciality"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                value={education}
                onChange={(e) => {
                  setEducation(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                value={address1}
                onChange={(e) => {
                  setaddress1(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                value={address2}
                onChange={(e) => {
                  setaddress2(e.target.value);
                }}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded"
            type="text"
            placeholder="Write acout doctor"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
