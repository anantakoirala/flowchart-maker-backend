import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { fileCreate, getTeamsFile } from "../controllers/fileController";
import { validate } from "../middleware/validate";
import { fileSchema } from "../zodSchema/fileCreateSchema";

const router = express.Router();
router.post("/file-create", authMiddleware, validate(fileSchema), fileCreate);
router.get("/get-teams-file/:teamId", authMiddleware, getTeamsFile);

export default router;
