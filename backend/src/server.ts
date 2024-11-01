import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

mongoose
  .connect(process.env.MONGODB_CONECTION_STRING as string)
  .then(() =>
    console.log(
      "Connection to database: ",
    )
  );

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,                 
}));


app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use((req, res, next) => {
  res.header("Content-Security-Policy", "script-src 'self' 'unsafe-inline' 'http://localhost:5173'");
  next();
});



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes)
app.use("/api/hotels", hotelRoutes)

app.get("*", (req:Request,res:Response)=>{
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
});

app.listen(3001, () => {
  console.log("server running on localhost:3001");
});
