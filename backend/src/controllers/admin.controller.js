import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { upload } from "../middlewares/multer.middleware.js";
import validator from "validator";
import { validationResult } from "express-validator";
import { Doctor } from "../models/doctor.model.js";
import Appointment from "../models/Appointment.model.js";
import {
  uploadoncloudinary,
  deletefromcloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"

//Adding doctor
const adddoctor = asynchandler(async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, {}, err.array()[0].msg));
  }
  const data = JSON.parse(req.body.data);

  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  } = data;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid Email"));
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password must be at least 8 characters"));
  }

  if (
    [name, email, password, speciality, degree, experience, about, fees].some(
      (item) => item.toString().trim() === ""
    )
  ) {
    res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
  }

  const imagefile = req.file;

  const imageres = await uploadoncloudinary(imagefile.path);

  if (!imageres.url) {
    res.status(400).json(new ApiResponse(400, {}, "Error in uploading image"));
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
    image: imageres.url,
    avaliable: true,
    date: Date.now(),
  });

  if (!doctor) {
    res.status(400).json(new ApiResponse(400, {}, "Error in adding doctor"));
    deletefromcloudinary(imageres.public_id);
  }

  res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor added successfully"));
});

//Api for the admin login
const adminlogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  if (
    email === process.env.Admin_Email &&
    password === process.env.Admin_Password
  ) {
    const accesstoken = jwt.sign(
      {
        email: email,
        password: password,
      },
      process.env.accesstoken,
      { expiresIn: process.env.accesstime }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("accesstoken", accesstoken, options)
      .json(new ApiResponse(200, { accesstoken }, "successfully logged in"));
  } else {
    res.status(400).json(new ApiResponse(400, {}, "Invalid email or password"));
  }
});

//All doctors
const alldoctors = asynchandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json(new ApiResponse(200, doctors, "All doctors"));
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//get all appointments
const allappointments = asynchandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res
      .status(200)
      .json(new ApiResponse(200, appointments, "All appointments fetched"));
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//cancel an appointment
const cancelappointment = asynchandler(async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const response = await Appointment.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    if (!response) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Appointment not cancelled"));
    }

    const { docId, slotDate, slotTime } = response;
    const docData = await Doctor.findById(docId).select("-password");
    let slots_booked = docData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (slot) => slot !== slotTime
    );

    await Doctor.findByIdAndUpdate(docId, { slots_booked });
    res
      .status(200)
      .json(new ApiResponse(200, response, "Appointment Cancelled"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//Dashboard data
const admindashboard = asynchandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    const user=await User.find({}).select("-password");
    const appointments = await Appointment.find({});

    const dashData={
      doctors:doctors.length,
      users:user.length,
      appointments:appointments.length,
      latestAppointment:appointments.reverse().slice(0,5)
    }

    res.status(200).json(new ApiResponse(200, dashData, "Dashboard data fetched"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
})

export { adddoctor, adminlogin, alldoctors, allappointments,cancelappointment,admindashboard };
