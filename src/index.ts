import express, { Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db";

import authRoutes from "./routes/auth";
import errorResponse from "./middleware/errorResponse";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

connectDB();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.use(errorResponse);

app.listen(process.env.PORT, () => {
  console.log("hello");
});
