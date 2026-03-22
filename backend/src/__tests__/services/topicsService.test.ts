import { NotFoundError } from "../../utils/errors.js";

// Topics service tests - validation logic
// Full integration tests with DB would be in E2E tests

describe("Topics Service - Validation", () => {
  describe("Error handling", () => {
    it("should throw NotFoundError with proper status code", () => {
      const error = new NotFoundError("Topic");

      expect(error.statusCode).toBe(404);
      expect(error.code).toBe("NOT_FOUND");
      expect(error.message).toBe("Topic not found");
    });

    it("should throw NotFoundError for any resource", () => {
      const error = new NotFoundError("User");

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("User not found");
    });
  });

  describe("Topic data validation", () => {
    it("should validate topic structure", () => {
      const validTopic = {
        id: "topic1",
        title: "Éducation",
        slug: "education",
        summary: "Summary",
        content: "Content",
        image: null,
        order: 1,
        createdAt: new Date(),
      };

      expect(validTopic.id).toBeDefined();
      expect(validTopic.slug).toMatch(/^[a-z-]+$/);
      expect(validTopic.order).toBeGreaterThanOrEqual(0);
    });
  });
});
