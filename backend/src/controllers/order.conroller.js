import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";

//payment gateway initialize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)


// placing order through cash on delivery method
const placeOrder = asyncHandler(async (req, res) => {
   try {
     const {userId, items, address, amount } = req.body;
    
    const orderData = {
        customer: userId,
        orderItems: items,
        orderPrice: amount,
        address,
        paymentMethod: "cod",
        payment: false,
        status: "PENDING",
        date:Date.now()
    };

    const newOrder = await Order.create(orderData);
    await newOrder.save()
    
    // Optional: Clear user's cart here

    await User.findByIdAndUpdate(userId,{$set:{cartData:{}}})
    
    res.status(201).json({ success: true, message: "Order Placed Successfully", order: newOrder });
    
   } catch (error) {
    console.log(error)

    
   }
});

//placing order through stripe method
const placeOrderStripe=asyncHandler(async (req,res)=>{
    const {userId, items, address, amount } = req.body;
    const {origin}=req.headers

    const orderData = {
        customer: userId,
        orderItems: items,
        orderPrice: amount,
        address,
        paymentMethod: "Stripe",
        payment: false,
        status: "PENDING",
        date:Date.now()
    };
    const newOrder = await Order.create(orderData);
    await newOrder.save()
    



})

//placing order through Razorpay methods
const placeOrderRazorpay=asyncHandler(async (req,res)=>{

})

//All order for admin pannel
const AllOrders=asyncHandler(async (req,res)=>{

    try {
        const orders=await Order.find({})

        res.json({success:true,message:"get all orders data successfully",orders})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
        
    }


})

//users orders data for frontend
const userOrders=asyncHandler(async (req,res)=>{
    
    try {
        const {userId}=req.body

        
        const orders = await Order.find({ customer:userId });

        res.json({success:true,message:"orders data fatched successfully",orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
})

//update order status for admin pannel
const updateStatus=asyncHandler(async (req,res)=>{

    try {
        const {orderId,status}=req.body

    await Order.findByIdAndUpdate(orderId,{$set:{status:status}})

    res.json({success:true,message:"status updated successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

})

export {placeOrder,placeOrderStripe,placeOrderRazorpay,AllOrders,userOrders,updateStatus,}