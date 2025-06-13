import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Doctor } from "../models/doctor.model.js";

const changeavailable = asynchandler(async (req, res) => {
    try{
        const {docid}=req.body

        const docdata=await Doctor.findById(docid).select('-password');

        if(!docdata){
            throw new ApiError(400, "doctor not found");
        }

        await Doctor.findByIdAndUpdate(docid,{
            avaliable: !docdata.avaliable
        })

        res.status(200).json(new ApiResponse(200, docdata, "Avaliable Status Updated"));
    }

    catch(err){
        res.status(400).json(new ApiResponse(400, {}, err.message));
    }
});

const getalldoctors=asynchandler(async(req,res)=>{
    try{
        const alldoctors=await Doctor.find({}).select(['-password','-email']);
        res.status(200).json(new ApiResponse(200, alldoctors, "All Doctors"));
    }
    catch(err){
        res.status(400).json(new ApiResponse(400, {}, err.message));
    }
})

export { changeavailable,getalldoctors };