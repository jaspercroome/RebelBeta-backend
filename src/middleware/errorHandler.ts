import { Request, Response, NextFunction } from "express";

// Custom error class
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle Supabase errors
  if (err.message.startsWith("JSON-RPC error")) {
    return res.status(400).json({
      status: "error",
      message: "Database operation failed",
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorHandler;
