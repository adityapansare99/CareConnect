import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import validator from "validator";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
      .json(new ApiResponse(200, {user,token}, "Account Successfully Created"));
  } catch (err) {
    res.status(400).json(new ApiResponse(400, {}, err.message));
  }
});

//login user

const loginuser = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res
        .status(400)
        .json(new ApiResponse(400, {}, "Email and Password are required"));
    }

    if(!validator.isEmail(email)){
        return res.status(400).json(new ApiResponse(400, {}, "Invalid Email"));
    }

    if(password.length<8){
        return res
        .status(400)
        .json(new ApiResponse(400, {}, "Password must be at least 8 characters"));
    }
    
    try {
        const user=await User.findOne({email});
        if(!user){
            throw new ApiError(400, "User not found");
        }

        const isMatch=await user.isPasswordCorrect(password);
        if(!isMatch){
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
            .json(new ApiResponse(200, {user,token}, "Login Successfully"));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, {}, error.message));
    }
});

export { registeruser,loginuser };
