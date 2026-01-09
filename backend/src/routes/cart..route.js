import { addToCart,updateCart,getUserCart } from "../controllers/cart.controller.js";
import {Router} from "express";
import verifyJWT from "../middlewares/userAuth.middleware.js";


const cartRouter=Router();

cartRouter.route("/add").post(verifyJWT,addToCart)
cartRouter.route("/get").post(verifyJWT,getUserCart)
cartRouter.route("/update").post(verifyJWT,updateCart)

export default cartRouter;