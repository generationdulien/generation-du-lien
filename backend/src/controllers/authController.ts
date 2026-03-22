import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema, verifyEmailSchema, resendVerificationSchema } from "../schemas/auth.js";
import * as authService from "../services/authService.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { ValidationError } from "../utils/errors.js";
import logger from "../config/logger.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validated = registerSchema.parse(req.body);

    // TODO: Validate CAPTCHA token with provider
    // For now, just accept it
    if (!validated.captchaToken) {
      throw new ValidationError("CAPTCHA validation failed");
    }

    const result = await authService.register({
      email: validated.email,
      password: validated.password,
      firstName: validated.firstName,
      lastName: validated.lastName,
    });

    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validated = verifyEmailSchema.parse(req.body);
    const result = await authService.verifyEmail(validated.token);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function verifyEmailQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.query.token as string;
    if (!token) {
      throw new ValidationError("Verification token is required");
    }
    const result = await authService.verifyEmail(token);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function resendVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validated = resendVerificationSchema.parse(req.body);
    const result = await authService.resendVerification(validated.email);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validated = loginSchema.parse(req.body);
    const result = await authService.login({
      email: validated.email,
      password: validated.password,
    });
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
