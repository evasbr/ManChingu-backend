import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return; // ⬅️ penting agar tidak lanjut ke bawah
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // atau jika sudah augmentasi: req.user = decoded
    next(); // ⬅️ selesai di sini, tidak return apa-apa
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
