import { Request, Response, NextFunction } from "express";
import { AuthQueries } from "../queries/index.js";
import { UserCreate } from "../types/user.schema.js";
import ClientError from "../handler/ClientError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserCreate = req.body;

  const existingUser = await AuthQueries.getUserByEmail(user.email);

  if (existingUser) {
    throw new ClientError("Email already used", 400);
  }

  const hashed = await bcrypt.hash(user.password, 10);

  const userToSave = {
    ...user,
    password: hashed,
  };

  const registeredUser = await AuthQueries.createNewUser(userToSave);
  const { password, ...userToSend } = registeredUser;
  const JWT_SECRET: string = process.env.JWT_SECRET ?? "secret_dev";
  const token = jwt.sign(
    { id_user: registeredUser.id_user, email: registeredUser.email },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    message: "Successfuly register new user",
    data: userToSend,
    token,
    statusCode: 201,
  };
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userData: UserCreate | null = await AuthQueries.getUserByEmail(email);

    if (!userData) {
      throw new ClientError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      throw new ClientError("Invalid email or password", 401);
    }

    const JWT_SECRET = process.env.JWT_SECRET ?? "secret_dev";

    const { password: pass, ...userToSend } = userData;

    const token = jwt.sign(
      { id_user: userData.id_user, email: userData.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      message: "Login successful",
      data: userToSend,
      token,
      statusCode: 200,
    };
  } catch (error) {
    next(error);
  }
};
