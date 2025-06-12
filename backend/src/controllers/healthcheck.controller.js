import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";

const healthcheck=asynchandler(async(req,res)=>{
    res.status(200).json(new ApiResponse(200,{},"success"))
})

export {healthcheck};
