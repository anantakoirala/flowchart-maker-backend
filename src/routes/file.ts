import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  fileCreate,
  getIndividualFileData,
  getTeamsFile,
  updateFile,
} from "../controllers/fileController";
import { validate } from "../middleware/validate";
import { fileSchema } from "../zodSchema/fileCreateSchema";

const router = express.Router();
router.post("/file-create", authMiddleware, validate(fileSchema), fileCreate);
router.get("/get-teams-file/:teamId", authMiddleware, getTeamsFile);
router.get(
  "/get-individual-file-data/:fileId",
  authMiddleware,
  getIndividualFileData
);
router.patch("/update-file/:id", authMiddleware, updateFile);

export default router;
