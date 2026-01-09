
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const { accesstoken } = req.headers; // Headers are often auto-lowercased by Express
        
        if (!accesstoken) {
            return res.json({success: false, message: "Unauthorized request"});
        }
    
        const decodedToken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
    
        // Use the same property name used during token creation (usually _id)
        const userId = decodedToken._id || decodedToken.id; 
        
        if (!userId) {
            return res.json({success: false, message: "Invalid Token Payload"});
        }

        // Pass the ID to the next function via req.body
        req.body.userId = userId;
        next();
    } catch (error) {
        return res.json({success: false, message: "Session Expired or Invalid Token"});
    }
});

export default verifyJWT;