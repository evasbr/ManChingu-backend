import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "secret_dev";

// export const signToken = (payload: Record<string, any>, expiresIn = "7d") => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn });
// };

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
