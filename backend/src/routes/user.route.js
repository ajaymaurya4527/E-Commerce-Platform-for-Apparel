import {Router} from "express";
import { adminLogin, loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter=Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/admin").post(adminLogin)



export default userRouter;