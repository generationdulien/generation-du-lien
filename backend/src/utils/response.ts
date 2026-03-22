import { Response } from "express";
import { AppError } from "./errors.js";

export interface ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200
) {
  const response: ApiResponse<T> = {
    statusCode,
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  error: AppError | Error,
  statusCode?: number
) {
  if (error instanceof AppError) {
    const response: ApiResponse = {
      statusCode: error.statusCode,
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
      timestamp: new Date().toISOString(),
    };
    res.status(error.statusCode).json(response);
  } else {
    const response: ApiResponse = {
      statusCode: statusCode || 500,
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: process.env.NODE_ENV === "production"
          ? "An unexpected error occurred"
          : error.message,
      },
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode || 500).json(response);
  }
}
