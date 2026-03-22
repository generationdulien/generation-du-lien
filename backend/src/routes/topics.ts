import { Router } from "express";
import * as topicsController from "../controllers/topicsController.js";

const router = Router();

/**
 * GET /api/topics
 * Get all published topics
 */
router.get("/", topicsController.getAllTopics);

/**
 * GET /api/topics/:id
 * Get topic by ID
 */
router.get("/:id", topicsController.getTopicById);

/**
 * GET /api/topics/slug/:slug
 * Get topic by slug
 */
router.get("/slug/:slug", topicsController.getTopicBySlug);

export default router;
