import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ClientError from "./ClientError.js";
import { Prisma } from "@prisma/client";

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} = Prisma;

const ErrorHandling: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging (optional)
  console.error("Error caught:", err);

  // Handle existing ClientError cases
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    let statusCode = 500;
    let message = "Database error";

    // Handle specific Prisma error codes
    switch (err.code) {
      case "P2002": // Unique constraint violation
        statusCode = 409;
        if (Array.isArray(err.meta?.target)) {
          message = `Duplicate entry for ${err.meta.target.join(", ")}`;
        } else {
          message = "Duplicate entry.";
        }
        break;
      case "P2025": // Record not found
        statusCode = 404;
        message = "Record not found";
        break;
      case "P2003": // Foreign key constraint failed
        statusCode = 400;
        message = "Related record not found";
        break;
      case "P2016": // Query interpretation error
        statusCode = 400;
        message = "Invalid query";
        break;
      case "P2014": // Relation violation
        statusCode = 400;
        message = "Invalid relation";
        break;
      case "P2011": // Null constraint violation
        statusCode = 400;
        message = "Null value not allowed";
        break;
      // Add more cases as needed
    }

    res.status(statusCode).json({
      success: false,
      message,
    });
    return;
  }

  // Handle Prisma validation errors
  if (err instanceof PrismaClientValidationError) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      details: err.message,
    });
    return;
  }

  // Handle other Prisma errors
  if (err instanceof PrismaClientInitializationError) {
    console.error("Prisma initialization error:", err);
    res.status(500).json({
      success: false,
      message: "Database connection error",
    });
    return;
  }

  if (err instanceof PrismaClientRustPanicError) {
    console.error("Critical Prisma error:", err);
    res.status(500).json({
      success: false,
      message: "Critical database error",
    });
    return;
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    console.error("Unknown Prisma request error:", err);
    res.status(500).json({
      success: false,
      message: "Unknown database request error",
    });
    return;
  }

  // Default error handler for unhandled errors
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
  return;
};
export default ErrorHandling;
