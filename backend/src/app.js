import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"



dotenv.config({path:"./.env"})

const app=express();

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(cookieParser())

//routes import
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js";

//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product",productRouter)

// Global error handler


export {app};







