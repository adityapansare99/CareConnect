import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import validator from "validator";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { Doctor } from "../models/doctor.model.js";
import Appointment from "../models/Appointment.model.js";
import razorpay from "razorpay";

//register user
const registeruser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((item) => item.trim().length === 0)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid Email"));
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password must be at least 8 characters"));
  }

  try {
    const userdata = {
      name,
      email,
      password,
    };

    const response = await User.create(userdata);

    if (!response) {
      throw new ApiError(400, "User not created");
    }

    const user = await User.findById(response._id).select("-password");

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.accesstoken,
      { expiresIn: process.env.accesstime }
    );

    res
      .status(200)
      .cookie("accesstoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json(
        new ApiResponse(200, { user, token }, "Account Successfully Created")
      );
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//login user
const loginuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email and Password are required"));
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid Email"));
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password must be at least 8 characters"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid Password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.accesstoken,
      { expiresIn: process.env.accesstime }
    );

    res
      .status(200)
      .cookie("accesstoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json(new ApiResponse(200, { user, token }, "Login Successfully"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//user data
const getprofile = asynchandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(new ApiResponse(200, user, "user data fetched"));
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//update the user
const updateuser = asynchandler(async (req, res) => {
  try {
    const { name, address, dob, gender, phone } = req.body;
    const imagefile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender,
      },
      { new: true }
    );

    if (imagefile) {
      const response = await uploadoncloudinary(imagefile.path);
      if (!response) {
        throw new ApiError(400, "Image not uploaded");
      }

      await User.findByIdAndUpdate(req.user._id, {
        image: response.url,
      });
    }

    res.status(200).json(new ApiResponse(200, user, "Profile data updated"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//book appointment
const bookappointment = asynchandler(async (req, res) => {
  const { docId, slotDate, slotTime } = req.body;

  const userId = req.user._id;

  if (!userId || !docId || !slotDate || !slotTime) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }
  try {
    const docData = await Doctor.findById(docId).select("-password");

    if(docData.avaliable === false){
      return res.status(400).json(new ApiResponse(400, {}, "Doctor is not avaliable"));
    }

    if (!docData) {
      return res.status(400).json(new ApiResponse(400, {}, "Doctor not found"));
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json(new ApiResponse(400, {}, "Slot already booked"));
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select("-password");

    delete docData.slots_booked;

    const newAppointment = await Appointment.create({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await Doctor.findByIdAndUpdate(docId, {
      slots_booked,
    });

    if (!newAppointment) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Appointment not booked"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, newAppointment, "Appointment Booked"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//all appointments that are booked by user
const getappointments = asynchandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id });
    res
      .status(200)
      .json(new ApiResponse(200, appointments, "All Appointments Fetched"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//cancel the appointment
const cancelappointment = asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;
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

const razorpayinstance = new razorpay({
  key_id: process.env.RazorPayKey,
  key_secret: process.env.RazorPaySecretKey,
});

//appointment payment using razorpay
const payment = asynchandler(async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Appointment not found or already cancelled")
        );
    }

    const options = {
      amount: appointmentData.amount*100,
      currency: process.env.Currency,
      receipt: appointmentId,
    };

    const order = await razorpayinstance.orders.create(options);

    res.status(200).json(new ApiResponse(200, order, "Order created"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

//api to verify the payment
const verifypayment = asynchandler(async (req, res) => {
  try {
    const {razorpay_order_id} = req.body;
    const orderInfo=await razorpayinstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status==="paid"){
      const appointmentId = orderInfo.receipt;
      await Appointment.findByIdAndUpdate(appointmentId,{payment:true});
      res.status(200).json(new ApiResponse(200, {}, "Payment Successful"));
    }

    else{
      res.status(400).json(new ApiResponse(400, {}, "Payment not Successful"));
    }
  } catch (error) {
    res.status(400).json(new ApiResponse(400, {}, error.message));
  }
})

export {
  registeruser,
  loginuser,
  getprofile,
  updateuser,
  bookappointment,
  getappointments,
  cancelappointment,
  payment,
  verifypayment
};
