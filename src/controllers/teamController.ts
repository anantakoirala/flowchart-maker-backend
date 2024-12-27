import { NextFunction, Request, Response } from "express";
import User from "../model/user";
import Team from "../model/team";

export const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const userId = req.userId;
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const dataToBeInserted = {
      name: name,
      owner: userId,
      members: [userId],
    };
    const team = await Team.create(dataToBeInserted);
    return res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

export const myTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const myTeams = await Team.find({ members: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, myTeams });
  } catch (error) {
    next(error);
  }
};
