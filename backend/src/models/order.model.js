import mongoose from "mongoose"



const orderSchema=new mongoose.Schema(
     {
    orderPrice: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: { type: Array,required:true},
    address: { type:Object, required: true },
    paymentMethod:{type:String,required:true},
    payment:{type:Boolean,required:true,default:false},
    date:{type:Number,required:true},
    status: {
      type: String,
      enum: ['PENDING', 'CANCELLED', 'DELIVERY'],
      default: 'PENDING',
    },

  },{timestamps:true})

export const Order=mongoose.model("Order",orderSchema)