import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "secret_dev";

export interface AuthRequest extends Request {
  user?: any; // bisa ganti dengan tipe user sesuai skema DB kamu
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
