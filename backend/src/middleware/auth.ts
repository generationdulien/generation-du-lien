import { Request, Response, NextFunction } from "express";
import { AuthError } from "../utils/errors.js";
import { verifyToken, extractTokenFromHeader } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  email?: string;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = (req as any).headers?.authorization as string | undefined;

  if (!authHeader) {
    throw new AuthError("Authorization header is required");
  }

  const token = extractTokenFromHeader(authHeader);
  if (!token) {
    throw new AuthError("Invalid authorization header format");
  }

  const payload = verifyToken(token);
  if (!payload) {
    throw new AuthError("Invalid or expired token");
  }

  req.userId = payload.userId;
  req.email = payload.email;

  next();
}
