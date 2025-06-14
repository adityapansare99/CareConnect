import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import validator from "validator";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { uploadoncloudinary } from "../utils/cloudinary.js";

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
    console.log("BODY", req.body);
    console.log("FILE", req.file);

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


export { registeruser, loginuser, getprofile,updateuser };
