import express, { Response, Request } from "express";
import { login, register } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { userRegisterSchema } from "../zodSchema/registerSchema";
import { userLoginSchema } from "../zodSchema/loginSchema";

const router = express.Router();

router.post("/login", validate(userLoginSchema), login);
router.post("/register", validate(userRegisterSchema), register);

export default router;
