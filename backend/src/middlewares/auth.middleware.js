import jwt from "jsonwebtoken";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";

const auth = asynchandler(async (req, _, next) => {
  const token =
    req.cookies.accesstoken ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.body.accesstoken;

  if (!token) {
    throw new ApiError(400, "token not found");
  }

  try {
    const decodedtoken = jwt.verify(token, process.env.accesstoken);
    if (!decodedtoken) {
      throw new ApiError(400, "invalid token");
    }

    if (
      decodedtoken.password !== process.env.Admin_Password ||
      decodedtoken.email !== process.env.Admin_Email
    ) {
      throw new ApiError(400, "invalid token");
    }
    next();
  } catch (err) {
    throw new ApiError(400, "invalid token");
  }
});

const authuser = asynchandler(async (req, res, next) => {
  const token =
    req.cookies.accesstoken ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.body.accesstoken;

  if (!token) {
    throw new ApiError(400, "token not found");
  }
  try {
    const decodedtoken = jwt.verify(token, process.env.accesstoken);
    if (!decodedtoken) {
      throw new ApiError(400, "invalid token");
    }

    const userId = decodedtoken.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "user not found");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(400, "invalid token");
  }
});

const authdoc = asynchandler(async (req, res, next) => {
  const token =
    req.cookies.dtoken ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.body.token;

  if (!token) {
    throw new ApiError(400, "token not found");
  }
  try {
    const decodedtoken = jwt.verify(token, process.env.accesstoken);
    if (!decodedtoken) {
      throw new ApiError(400, "invalid token");
    }

    const docId = decodedtoken.id;
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      throw new ApiError(400, "Doctor not found");
    }

    req.doc = doctor;
    next();
  } catch (err) {
    throw new ApiError(400, "invalid token");
  }
});

export { auth, authuser, authdoc };
