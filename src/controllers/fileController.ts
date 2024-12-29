import { NextFunction, Request, Response } from "express";
import Team from "../model/team";
import File from "../model/file";

export const fileCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, teamId } = req.body;

    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check if the team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request: Team not found" });
    }

    // Check the number of files poer team
    const teamFiles = await File.find({ teamId: teamId });

    if (teamFiles.length > 5) {
      return res.status(400).json({
        success: false,
        message: "You cannot have more than 5 files in the team.",
      });
    }

    // Check if the user is the owner or a member of the team
    const isUserInTeam =
      team.owner.toString() === req.userId ||
      team.members.some((member) => member.toString() === req.userId);

    if (!isUserInTeam) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not belong to this team",
      });
    }

    const file = await File.create({ title, teamId, createdBy: req.userId });
    const newTeamFiles = await File.find({ teamId: teamId });
    return res.status(200).json({
      success: true,
      message: "File created successfully",
      numberOfFiles: newTeamFiles.length,
      // data: file, // Include file data if necessary
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamsFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId } = req.params;
    console.log("teamid", teamId);
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const teamFiles = await File.find({ teamId: teamId })
      .sort({ createdAt: -1 })
      .select("title createdAt updatedAt createdBy")
      .populate({
        path: "createdBy",
        select: "email", // Include only the `name` field from the `User` model
      });

    return res.status(200).json({
      success: true,
      message: "succcess",
      totalNumberOfFiles: teamFiles.length,
      files: teamFiles,
    });
  } catch (error) {
    next(error);
  }
};
