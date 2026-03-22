import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", authController.register);

/**
 * POST /api/auth/verify-email
 * Verify email with token in request body
 */
router.post("/verify-email", authController.verifyEmail);

/**
 * GET /api/auth/verify-email?token=xxx
 * Verify email with token in query params (for email links)
 */
router.get("/verify-email", authController.verifyEmailQuery);

/**
 * POST /api/auth/resend-verification
 * Resend verification email
 */
router.post("/resend-verification", authController.resendVerification);

/**
 * POST /api/auth/login
 * Login user
 */
router.post("/login", authController.login);

export default router;
