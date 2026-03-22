import { hashPassword, comparePasswords } from "../../utils/bcrypt.js";

describe("Bcrypt Utils", () => {
  describe("hashPassword", () => {
    it("should hash a password", async () => {
      const password = "SecurePassword123";
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20);
    });

    it("should produce different hashes for same password", async () => {
      const password = "SecurePassword123";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("comparePasswords", () => {
    it("should return true for matching passwords", async () => {
      const password = "SecurePassword123";
      const hash = await hashPassword(password);
      const isMatch = await comparePasswords(password, hash);

      expect(isMatch).toBe(true);
    });

    it("should return false for non-matching passwords", async () => {
      const password = "SecurePassword123";
      const wrongPassword = "WrongPassword456";
      const hash = await hashPassword(password);
      const isMatch = await comparePasswords(wrongPassword, hash);

      expect(isMatch).toBe(false);
    });
  });
});
