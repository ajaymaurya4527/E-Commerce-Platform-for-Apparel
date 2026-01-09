import { asyncHandler } from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken";
import { response } from "express";

const generateAccessAndRefereshTokens=async (userId)=>{
    const user=await User.findById(userId);
    const accessToken=user.generateAccessToken();
    const refreshToken=user.generateRefreshToken();

    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
}


const registerUser=asyncHandler(async (req,res)=>{

   try {
     const {name,email,password}=req.body

    if([name,email,password].some((field)=>field?.trim() === "")){
        return res.json({success:false,message:"All Fields are required"})
    }

    if(password.length<8){
        return res.json({success:false,message:"please enter strong password of length of 8 or more then 8"})
    }

    const existedUser=await User.findOne({
        email
    })

    if(existedUser){
        return res.json({success:false,message:"Email Already Exists"})
    }

    const user=await User.create({
        name,
        email,
        password,

    })
    const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(user._id)

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        return res.json({success:false,message:"something went wrong while registering user"})
    }

    return res.status(201)
    .json(new ApiResponse(200,{user:createdUser,accessToken},"user registered successfully"))
    
   } catch (error) {
    
   }


})

const loginUser=asyncHandler(async (req,res)=>{

    const {email,password}=req.body

    if(!email && !password){
        return res.json({success:false,message:"Email and Password is required"})
    }

    const user=await User.findOne({
        email
    })

    if(!user){
        return res.json({success:false,message:"User does not exist"})
    }

    if(!user){
        return response.json({success:false,message:"User does not exist please enter valid email"})
    }

    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        return res.json({success:false,message:"Incorrect Password"})
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
    },"Logged in successfully"))








})
const adminLogin=asyncHandler(async (req,res)=>{

    const {email,password}=req.body

    if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password){
        const token=jwt.sign(email+password,process.env.TOKEN_SECRET);

        const options = {
        httpOnly: true,
        secure: true
        }
        
        return res.status(200)
        .cookie("token",token,options)
        .json(new ApiResponse(200,token,"Admin login successfully"))  
    }else {
        return res.json({success:false, message:"Invalid credentials"})
    }
    
})

export {registerUser,loginUser,adminLogin}