import express from "express";
import { validate } from "../middleware/validate";
import { createTeamSchema } from "../zodSchema/createTeamSchema";
import { createTeam, myTeams } from "../controllers/teamController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-team",
  validate(createTeamSchema),
  authMiddleware,
  createTeam
);

router.get("/my-teams", authMiddleware, myTeams);

export default router;
