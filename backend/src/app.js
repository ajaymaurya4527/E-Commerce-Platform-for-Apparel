import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({path:"./.env"})

const app=express();

//middlewares
app.use(express.json())
app.use(cors())

export {app};







