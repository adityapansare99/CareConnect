import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { upload } from "../middlewares/multer.middleware.js";
import validator from "validator";
import { validationResult } from "express-validator";
import { Doctor } from "../models/doctor.model.js";
import {
  uploadoncloudinary,
  deletefromcloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

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

export { adddoctor, adminlogin };
