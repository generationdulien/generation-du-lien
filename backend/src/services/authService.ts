import prisma from "../config/db.js";
import logger from "../config/logger.js";
import { hashPassword, comparePasswords } from "../utils/bcrypt.js";
import {
  generateToken,
  generateVerificationToken,
  verifyVerificationToken,
} from "../utils/jwt.js";
import { ConflictError, AuthError, NotFoundError } from "../utils/errors.js";
import { emailService } from "./emailService.js";

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new ConflictError("Email already exists");
  }

  // Hash password
  const passwordHash = await hashPassword(payload.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: payload.email,
      passwordHash,
      firstName: payload.firstName,
      lastName: payload.lastName,
    },
  });

  logger.info(`User registered: ${user.id}`);

  // Generate verification token
  const verificationToken = generateVerificationToken({
    userId: user.id,
    email: user.email,
    type: "email-verification",
  });

  // Send verification email
  await emailService.sendVerificationEmail(user.email, verificationToken);

  return {
    id: user.id,
    email: user.email,
    verificationSent: true,
  };
}

export async function verifyEmail(token: string) {
  const payload = verifyVerificationToken(token);

  if (!payload) {
    throw new AuthError("Invalid or expired verification token");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  // Mark user as verified
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { verified: true },
  });

  logger.info(`User verified: ${user.id}`);

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    verified: updatedUser.verified,
  };
}

export async function resendVerification(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  if (user.verified) {
    throw new AuthError("User is already verified");
  }

  const verificationToken = generateVerificationToken({
    userId: user.id,
    email: user.email,
    type: "email-verification",
  });

  await emailService.sendVerificationEmail(user.email, verificationToken);

  logger.info(`Verification email resent: ${user.id}`);

  return {
    email: user.email,
    verificationSent: true,
  };
}

export async function login(payload: LoginPayload) {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AuthError("Invalid email or password");
  }

  const passwordValid = await comparePasswords(
    payload.password,
    user.passwordHash
  );

  if (!passwordValid) {
    throw new AuthError("Invalid email or password");
  }

  if (!user.verified) {
    throw new AuthError("Email not verified");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  logger.info(`User logged in: ${user.id}`);

  return {
    id: user.id,
    email: user.email,
    token,
  };
}
