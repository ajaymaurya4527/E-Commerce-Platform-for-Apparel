import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";

//global variables
const currency = "usd"
const deliveryCharge = 10

//payment gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing order through cash on delivery method
const placeOrder = asyncHandler(async (req, res) => {
    try {
        const { userId, items, address, amount } = req.body;

        const orderData = {
            customer: userId,
            orderItems: items,
            orderPrice: amount,
            address,
            paymentMethod: "cod",
            payment: false,
            status: "PENDING",
            date: Date.now()
        };

        const newOrder = await Order.create(orderData);
        await newOrder.save()

        // Optional: Clear user's cart here

        await User.findByIdAndUpdate(userId, { $set: { cartData: {} } })

        res.status(201).json({ success: true, message: "Order Placed Successfully", order: newOrder });

    } catch (error) {
        console.log(error)


    }
});

//placing order through stripe method
const placeOrderStripe = asyncHandler(async (req, res) => {
   try {
     const { userId, items, address, amount } = req.body;
    const { origin } = req.headers

    const orderData = {
        customer: userId,
        orderItems: items,
        orderPrice: amount,
        address,
        paymentMethod: "Stripe",
        payment: false,
        status: "PENDING",
        date: Date.now()
    };
    const newOrder = await Order.create(orderData);
    await newOrder.save()

    const line_items = items.map((item) => ({
        price_data: {
            currency: currency,
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100
        },
        quantity: item.quantity
    }))
    line_items.push({
        price_data: {
            currency: currency,
            product_data: {
                name: "Delivery Charges"
            },
            unit_amount: deliveryCharge * 100
        },
        quantity: 1
    })

    const session=await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:"payment"
    })

    res.json({success:true,session_url:session.url})

    
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
   }


})
const verifyStripe = asyncHandler(async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            // Optional: Clear cart again here as double safety
            await User.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Paid" });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

//placing order through Razorpay methods
const placeOrderRazorpay = asyncHandler(async (req, res) => {

})

//All order for admin pannel
const AllOrders = asyncHandler(async (req, res) => {

    try {
        const orders = await Order.find({})

        res.json({ success: true, message: "get all orders data successfully", orders })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })


    }


})

//users orders data for frontend
const userOrders = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.body


        const orders = await Order.find({ customer: userId });

        res.json({ success: true, message: "orders data fatched successfully", orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
})

//update order status for admin pannel
const updateStatus = asyncHandler(async (req, res) => {

    try {
        const { orderId, status } = req.body

        await Order.findByIdAndUpdate(orderId, { $set: { status: status } })

        res.json({ success: true, message: "status updated successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

})

export { placeOrder, placeOrderStripe, placeOrderRazorpay, AllOrders, userOrders, updateStatus,verifyStripe }