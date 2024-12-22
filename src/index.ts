import express, { Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db";

const app = express();
connectDB();

app.listen(process.env.PORT, () => {
  console.log("hello");
});
