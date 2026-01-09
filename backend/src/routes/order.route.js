import {Router} from "express";
import {placeOrder,placeOrderStripe,placeOrderRazorpay,AllOrders,userOrders,updateStatus} from "../controllers/order.conroller.js"
import verifyJWT from "../middlewares/userAuth.middleware.js";
import addminAuth from "../middlewares/adminAuth.middleware.js";

const orderRouter=Router();

//payment methods
orderRouter.route("/place").post(verifyJWT,placeOrder)
orderRouter.route("/stripe").post(verifyJWT,placeOrderStripe)
orderRouter.route("/razorpay").post(verifyJWT,placeOrderRazorpay)

//user features
orderRouter.route("/user-orders").post(verifyJWT,userOrders)

//admin route
orderRouter.route("/list-orders").post(addminAuth,AllOrders)
orderRouter.route("/update-status").post(addminAuth,updateStatus)

export default orderRouter;