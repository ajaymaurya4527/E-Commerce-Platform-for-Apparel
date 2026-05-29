import {Router} from "express";
import { adminLogin, loginUser, registerUser,changePassword,userName,updateName,refreshAccessToken } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/userAuth.middleware.js";

const userRouter=Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/admin").post(adminLogin)
userRouter.route("/change-password").post(verifyJWT,changePassword)
userRouter.route("/username").post(verifyJWT,userName)
userRouter.route("/update-profile").post(verifyJWT,updateName)



export default userRouter;