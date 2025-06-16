import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Doctor } from "../models/doctor.model.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.model.js";

const changeavailable = asynchandler(async (req, res) => {
  try {
    const { docid } = req.body;

    const docdata = await Doctor.findById(docid).select("-password");

    if (!docdata) {
      throw new ApiError(400, "doctor not found");
    }

    await Doctor.findByIdAndUpdate(docid, {
      avaliable: !docdata.avaliable,
    });

    res
      .status(200)
      .json(new ApiResponse(200, docdata, "Avaliable Status Updated"));
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

const getalldoctors = asynchandler(async (req, res) => {
  try {
    const alldoctors = await Doctor.find({}).select(["-password", "-email"]);
    res.status(200).json(new ApiResponse(200, alldoctors, "All Doctors"));
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//login doctor
const logindoctor = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "All fields are required"));
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Email"));
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Email"));
    }

    const isMatch = await doctor.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Password"));
    }

    const dtoken = await jwt.sign(
      {
        id: doctor._id,
        email: doctor.email,
      },
      process.env.accesstoken,
      {
        expiresIn: process.env.accesstime,
      }
    );

    if (!dtoken) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Error in login! Try Again"));
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("dtoken", dtoken, options)
      .json(
        new ApiResponse(200, { token: dtoken, doctor }, "Doctor Logged In")
      );
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//doctors appointments
const docappointments = asynchandler(async (req, res) => {
  try {
    const docId = req.doc._id;

    if (!docId) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Error in login! Try Again"));
    }

    const appointments = await Appointment.find({ docId });

    if (!appointments) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Error in login! Try Again"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, appointments, "Appointments Fetched"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//appointment completed
const completedappointment=asynchandler(async(req,res)=>{
    try {
        const {appointmentId}=req.body;

        if(!appointmentId){
            return res
            .status(400)
            .json(new ApiResponse(400, {}, "Appointment not found"));
        }
        
        const response=await Appointment.findByIdAndUpdate(appointmentId,{isComplete:true});

        if(!response){
            return res
            .status(400)
            .json(new ApiResponse(400, {}, "Appointment not found"));
        }

        res
        .status(200)
        .json(new ApiResponse(200, response, "Appointment Completed"));

    } catch (error) {
        return res.status(400).json(new ApiResponse(400, {}, error.message));
    }
})

//appointment cancelled
const cancelappointment=asynchandler(async(req,res)=>{
    try {
        const {appointmentId}=req.body;

        if(!appointmentId){
            return res
            .status(400)
            .json(new ApiResponse(400, {}, "Appointment not found"));
        }
        
        const response=await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true});

        if(!response){
            return res
            .status(400)
            .json(new ApiResponse(400, {}, "Appointment not found"));
        }

        res
        .status(200)
        .json(new ApiResponse(200, response, "Appointment Cancelled"));

    } catch (error) {
        return res.status(400).json(new ApiResponse(400, {}, error.message));
    }
})

export { changeavailable, getalldoctors, logindoctor,docappointments,completedappointment,cancelappointment };
