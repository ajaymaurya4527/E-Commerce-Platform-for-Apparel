import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    refreshToken: {
            type: String
        },
    cartData:{type:Object,default:{}}

},{timestamps:true,minimize:false});// minimize false because of carData default false


/* this code not run don't know the reason
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
    */


// No 'next' function needed when returning a Promise
userSchema.pre("save", function () { 
    // It's still a REGULAR function so 'this' binds correctly to the document.
    if (!this.isModified("password")) return; // Simply return if no modification

    // Return the Promise from the async operation (bcrypt.hash)
    return bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
        });
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema);
