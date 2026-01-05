import {asyncHandler} from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import {Product} from "../models/product.model.js"
import { apiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"


//function for add product
const addProduct=asyncHandler(async (req,res)=>{

    const {name,description,price,category,subCategory,sizes,bestseller}=req.body

    const image1=req.files?.image1 && req.files?.image1[0]
    const image2=req.files?.image2 && req.files?.image2[0]
    const image3=req.files?.image3 && req.files?.image3[0]
    const image4=req.files?.image4 && req.files?.image4[0]

    const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)

    let imagesUrl=await Promise.all(
        images.map(async (item)=>{
            let result=await uploadOnCloudinary(item.path);
            return result.secure_url
        })
    )
    const product=await Product.create({
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes,
        bestseller:bestseller === "true" ? true:false,
        image:imagesUrl,
        Date:Date.now(),

    })

    if(!product){
        throw new apiError(500,"something went wrong while adding product")
    }

    return res.status(200)
    .json(new ApiResponse(200,product,"product added successfully"))

})

//function for list of product
const listProduct=asyncHandler(async (req,res)=>{

    const products=await Product.find({});
    
    return res.status(200)
    .json(new ApiResponse(200,products,"listed successfully"))

})

//function for remove product
const removeProduct=asyncHandler(async (req,res)=>{

    const removeProduct=await Product.findByIdAndDelete(req.body.id)

    return res.status(200)
    .json(new ApiResponse(200,removeProduct,"Product Removed Successfully"))

})

//function for single product info
const singleProduct=asyncHandler(async (req,res)=>{
    const {productId}=req.body

    const product=await Product.findById(productId)

    return res.status(200)
    .json(new ApiResponse(200,product,"product data fatched successfully"))

})

export {addProduct,listProduct,removeProduct,singleProduct};




