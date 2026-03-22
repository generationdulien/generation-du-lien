import logger from "../config/logger.js";

const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const HCAPTCHA_VERIFY_URL = "https://hcaptcha.com/siteverify";

export interface HCaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  score?: number;
  score_reason?: string;
}

/**
 * Verify hCaptcha token with hCaptcha API
 */
export async function verifyHCaptchaToken(
  token: string
): Promise<{ valid: boolean; error?: string }> {
  if (!HCAPTCHA_SECRET) {
    logger.warn("⚠️  HCAPTCHA_SECRET not configured, skipping verification");
    return { valid: true }; // Skip verification in dev if secret not configured
  }

  if (!token || token.trim() === "") {
    return { valid: false, error: "CAPTCHA token is required" };
  }

  try {
    const response = await fetch(HCAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        response: token,
        secret: HCAPTCHA_SECRET,
      }),
    });

    if (!response.ok) {
      logger.error("❌ hCaptcha API error", {
        status: response.status,
        statusText: response.statusText,
      });
      return { valid: false, error: "CAPTCHA verification failed" };
    }

    const result = (await response.json()) as HCaptchaVerifyResponse;

    if (result.success) {
      logger.info("✅ CAPTCHA verified successfully");
      return { valid: true };
    } else {
      logger.warn("❌ CAPTCHA verification failed", {
        errors: result["error-codes"],
      });
      return {
        valid: false,
        error: "CAPTCHA verification failed: " +
          (result["error-codes"]?.join(", ") || "Unknown error"),
      };
    }
  } catch (error) {
    logger.error("❌ Error verifying hCaptcha token", {
      error: error instanceof Error ? error.message : String(error),
    });
    return { valid: false, error: "CAPTCHA verification error" };
  }
}
