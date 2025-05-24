import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    validatedData?: any; // kamu bisa ganti `any` dengan tipe generik kalau mau
  }
}
