import { Request, Response, NextFunction } from "express";
import * as topicsService from "../services/topicsService.js";
import { sendSuccess } from "../utils/response.js";

export async function getAllTopics(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const topics = await topicsService.getAllTopics();
    sendSuccess(res, topics);
  } catch (error) {
    next(error);
  }
}

export async function getTopicById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const topic = await topicsService.getTopicById(id);
    sendSuccess(res, topic);
  } catch (error) {
    next(error);
  }
}

export async function getTopicBySlug(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { slug } = req.params;
    const topic = await topicsService.getTopicBySlug(slug);
    sendSuccess(res, topic);
  } catch (error) {
    next(error);
  }
}
