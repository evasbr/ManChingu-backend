import { Request, Response, NextFunction } from "express";
import ClientError from "../handler/ClientError.js";
import { UserQueries } from "../queries/index.js";

async function getMyProfile(req: Request, res: Response, next: NextFunction) {
  const userId = req.user.id_user;

  const data = await UserQueries.getUserById(userId);

  if (!data) {
    throw new ClientError("User not found", 404);
  }

  return {
    statusCode: 200,
    data,
  };
}

async function getProfileById(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId;

  const data = await UserQueries.getUserById(userId);

  if (!data) {
    throw new ClientError("User not found", 404);
  }

  return {
    statusCode: 200,
    data,
  };
}

export { getMyProfile, getProfileById };
