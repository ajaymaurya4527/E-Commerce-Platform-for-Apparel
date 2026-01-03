import { asyncHandler } from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens=async (userId)=>{
    const user=await User.findById(userId);
    const accessToken=user.generateAccessToken();
    const refreshToken=user.generateRefreshToken();

    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
}


const registerUser=asyncHandler(async (req,res)=>{

    const {name,email,password}=req.body

    if([name,email,password].some((field)=>field?.trim() === "")){
        throw new apiError(400,"all fields are required")
    }

    if(password.length<8){
        throw new apiError(400,"please enter strong password of length of 8 or more then 8")
    }

    const existedUser=await User.findOne({
        email
    })

    if(existedUser){
        throw  new apiError(400,"email already exists")
    }

    const user=await User.create({
        name,
        email,
        password
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500,"something went wrong while registering user")
    }

    return res.status(201)
    .json(new ApiResponse(200,createdUser,"user registered successfully"))


})

const loginUser=asyncHandler(async (req,res)=>{

    const {email,password}=req.body

    if(!email && !password){
        throw new apiError(400,"email and password is required")
    }

    const user=await User.findOne({
        email
    })

    if(!user){
        throw new apiError(400,"user does not exist please enter valid email")
    }

    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new apiError(401,"incorrect password")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(user._id)

    const loggedInUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{
        user:loggedInUser,accessToken,refreshToken
    },"user logged in successfully"))








})
const adminLogin=asyncHandler(async (req,res)=>{

    const {email,password}=req.body

    if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password){
        const token=jwt.sign(email+password,process.env.ACCESS_TOKEN_SECRET);

        const options = {
        httpOnly: true,
        secure: true
        }
        
        return res.status(200)
        .cookie("token",token,options)
        .json(new ApiResponse(200,token,"Admin login successfully"))

        
    }
    
})

export {registerUser,loginUser,adminLogin}