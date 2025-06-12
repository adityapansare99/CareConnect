import jwt from "jsonwebtoken";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

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

   if(decodedtoken.password!==process.env.Admin_Password || decodedtoken.email!==process.env.Admin_Email){
    throw new ApiError(400, "invalid token");
   }
    next();
  } catch (err) {
    throw new ApiError(400, "invalid token");
  }
});

export { auth };