import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const addminAuth=async (req,res,next)=>{
    try {
        const {token}=req.cookies?.token || req.headers
        if(!token){
            throw new apiError(401,"Not Autherzied Person Login Again")
        }

        const token_decode=jwt.verify(token,process.env.TOKEN_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            throw new apiError(401,"Not Autherzied")
        }

        next()
        
    } catch (error) {
        console.log(error)
        res.json({success:"false",message:error.message})
    }
}

export default addminAuth;