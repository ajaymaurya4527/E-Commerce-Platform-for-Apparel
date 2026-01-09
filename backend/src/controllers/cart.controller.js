import { User } from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const addToCart = asyncHandler(async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await User.findById(userId);
        if (!userData) return res.json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {}; // Ensure cartData exists

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }

        // Use findByIdAndUpdate with the $set operator for reliability
        await User.findByIdAndUpdate(userId, { $set: { cartData } });

        return res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

const updateCart=asyncHandler(async (req,res)=>{
    try {
        const {userId,itemId,size,quantity}=req.body

        const userData=await User.findById(userId)
        let cartData=await userData.cartData;

        cartData[itemId][size]=quantity

        await User.findByIdAndUpdate(userId,{$set:{cartData}})

       return res.json({success:true,message:"Cart updated"})


        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
    
})

const getUserCart=asyncHandler(async (req,res)=>{

    try {

        const {userId}=req.body

        const userData=await User.findById(userId)
        let cartData=await userData.cartData;

       return res.json({success:true,cartData,message:""})

        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
    
})


export {addToCart,updateCart,getUserCart}