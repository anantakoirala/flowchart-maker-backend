import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import { authToken, refreshtToken } from "../utils/getSignedToken";
import { generateCookie } from "../utils/generateCookie";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "not found" });
    }
    const token = authToken(user.id.toString());
    const refresh_token = refreshtToken(user.id.toString());
    generateCookie(res, token, refresh_token);

    return res
      .status(200)
      .json({ success: "true", message: "login successfull" });
  } catch (error) {
    next(error); // Passes the error to the Express error handler
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newUser = await User.create(body);
    console.log("newUser", newUser);
    return res
      .status(200)
      .json({ success: true, message: "registered successfully" });
  } catch (error) {
    next(error);
  }
};
