import {Router} from "express";
import { adminLogin, loginUser, registerUser,changePassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/userAuth.middleware.js";

const userRouter=Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/admin").post(adminLogin)
userRouter.route("/change-password").post(verifyJWT,changePassword)



export default userRouter;