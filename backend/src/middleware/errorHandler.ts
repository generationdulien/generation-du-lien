import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { sendError } from "../utils/response.js";
import logger from "../config/logger.js";
import { ZodError } from "zod";

export function errorHandler(
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log all errors
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    return res.status(422).json({
      statusCode: 422,
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: formattedErrors,
      },
      timestamp: new Date().toISOString(),
    });
  }

  // Handle AppError
  if (err instanceof AppError) {
    sendError(res, err);
  } else {
    // Handle unknown errors
    const statusCode = 500;
    sendError(res, err, statusCode);
  }
}
