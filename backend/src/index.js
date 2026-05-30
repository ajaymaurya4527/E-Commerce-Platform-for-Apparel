import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

// Database connect karein
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

// for local environment
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port ${process.env.PORT || 8000}`);
  });
}

// Vercel serverless environment
export default app;