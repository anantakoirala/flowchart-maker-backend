import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import { authToken, refreshtToken } from "../utils/getSignedToken";
import { generateCookie } from "../utils/generateCookie";
import jwt, { JwtPayload } from "jsonwebtoken";

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

export const generateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decodedRefreshToken = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    if (!decodedRefreshToken) {
      return res.status(403).json({ message: "invalid refresh token" });
    }

    const userId = (decodedRefreshToken as JwtPayload).id; // Extract the `id` from the decoded token

    // Ensure `findUnique` uses the correct syntax
    // const user = await db.user.findUnique({
    //   where: { id: userId.toString() },
    // });
    const user = await User.findById(userId.toString());

    if (!user) {
      res.clearCookie("token");
      res.clearCookie("refresh_token");
      return res.status(404).json({ message: "User not found" });
    }

    const token = authToken(userId.toString());
    const refreshToken = refreshtToken(userId.toString());
    generateCookie(res, token, refreshToken);
    return res.status(200).json({ success: true, refreshToken, token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const me = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, "name");

  // const user = await User.findById(req.userId);
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  return res.status(200).json({ message: "succces", user });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Before clearing:", req.cookies.token);
    res.clearCookie("token");
    // res.clearCookie("token", {
    //   path: "/",
    //   httpOnly: true,
    //   domain: process.env.COOKIE_DOMAIN, // or the appropriate domain for your frontend
    //   secure: true,
    //   sameSite: "none",
    // });
    return res
      .status(200)
      .json({ success: "true", message: "logout succcessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
