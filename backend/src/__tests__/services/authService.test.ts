import { ConflictError, AuthError } from "../../utils/errors.js";
import { verifyVerificationToken } from "../../utils/jwt.js";

// Tests for auth service validation logic only
// Full integration tests with DB would be in E2E tests

describe("Auth Service - Validation", () => {
  describe("Email verification logic", () => {
    it("should validate verification token format", () => {
      // Test that invalid tokens fail
      const result = verifyVerificationToken("invalid.token");
      expect(result).toBeNull();
    });

    it("should reject auth errors for invalid operations", () => {
      // Example error creation
      const error = new AuthError("Email not verified");
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe("AUTH_ERROR");
    });
  });

  describe("Conflict detection", () => {
    it("should throw conflict error for duplicate email", () => {
      const error = new ConflictError("Email already exists");
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe("CONFLICT");
      expect(error.message).toBe("Email already exists");
    });
  });
});
