import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "24h") as SignOptions["expiresIn"];
const VERIFICATION_TOKEN_EXPIRES_IN = (
  process.env.VERIFICATION_TOKEN_EXPIRES_IN || "7d"
) as SignOptions["expiresIn"];

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface VerificationTokenPayload {
  userId: string;
  email: string;
  type: "email-verification";
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function generateVerificationToken(
  payload: VerificationTokenPayload
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: VERIFICATION_TOKEN_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function verifyVerificationToken(
  token: string
): VerificationTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as VerificationTokenPayload;
    if (decoded.type !== "email-verification") {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string): string | null {
  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }
  return null;
}
