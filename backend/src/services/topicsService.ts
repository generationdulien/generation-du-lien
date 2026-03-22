import prisma from "../config/db.js";
import { NotFoundError } from "../utils/errors.js";

export async function getAllTopics() {
  const topics = await prisma.topic.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      image: true,
      order: true,
    },
  });

  return topics;
}

export async function getTopicById(id: string) {
  const topic = await prisma.topic.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      content: true,
      image: true,
      order: true,
      createdAt: true,
    },
  });

  if (!topic) {
    throw new NotFoundError("Topic");
  }

  return topic;
}

export async function getTopicBySlug(slug: string) {
  const topic = await prisma.topic.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      content: true,
      image: true,
      order: true,
      createdAt: true,
    },
  });

  if (!topic) {
    throw new NotFoundError("Topic");
  }

  return topic;
}
