import {
  generateToken,
  generateVerificationToken,
  verifyToken,
  verifyVerificationToken,
  extractTokenFromHeader,
} from "../../utils/jwt.js";

describe("JWT Utils", () => {
  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      const payload = { userId: "user123", email: "test@example.com" };
      const token = generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // JWT format: header.payload.signature
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid token", () => {
      const payload = { userId: "user123", email: "test@example.com" };
      const token = generateToken(payload);
      const verified = verifyToken(token);

      expect(verified).toBeDefined();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.email).toBe(payload.email);
    });

    it("should return null for invalid token", () => {
      const verified = verifyToken("invalid.token.here");
      expect(verified).toBeNull();
    });

    it("should return null for tampered token", () => {
      const payload = { userId: "user123", email: "test@example.com" };
      const token = generateToken(payload);
      const tamperedToken = token.slice(0, -5) + "xxxxx";
      const verified = verifyToken(tamperedToken);

      expect(verified).toBeNull();
    });
  });

  describe("generateVerificationToken", () => {
    it("should generate a verification token with correct type", () => {
      const payload = {
        userId: "user123",
        email: "test@example.com",
        type: "email-verification" as const,
      };
      const token = generateVerificationToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
    });
  });

  describe("verifyVerificationToken", () => {
    it("should verify a valid verification token", () => {
      const payload = {
        userId: "user123",
        email: "test@example.com",
        type: "email-verification" as const,
      };
      const token = generateVerificationToken(payload);
      const verified = verifyVerificationToken(token);

      expect(verified).toBeDefined();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.type).toBe("email-verification");
    });

    it("should return null for invalid verification token", () => {
      const verified = verifyVerificationToken("invalid.token.here");
      expect(verified).toBeNull();
    });
  });

  describe("extractTokenFromHeader", () => {
    it("should extract token from Bearer header", () => {
      const token = "some.jwt.token";
      const header = `Bearer ${token}`;
      const extracted = extractTokenFromHeader(header);

      expect(extracted).toBe(token);
    });

    it("should return null for invalid header format", () => {
      const extracted = extractTokenFromHeader("InvalidFormat token");
      expect(extracted).toBeNull();
    });

    it("should return null for missing Bearer prefix", () => {
      const extracted = extractTokenFromHeader("some.jwt.token");
      expect(extracted).toBeNull();
    });
  });
});
