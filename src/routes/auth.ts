import express, { Response, Request } from "express";
import {
  generateRefreshToken,
  login,
  me,
  register,
} from "../controllers/authController";
import { validate } from "../middleware/validate";
import { userRegisterSchema } from "../zodSchema/registerSchema";
import { userLoginSchema } from "../zodSchema/loginSchema";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", validate(userLoginSchema), login);
router.post("/register", validate(userRegisterSchema), register);
router.get("/me", authMiddleware, me);
router.post("/refresh-token", generateRefreshToken);

export default router;
