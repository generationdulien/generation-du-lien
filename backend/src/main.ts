import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import topicsRoutes from "./routes/topics.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ============= Middleware =============
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:5173").split(","),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= Health Check =============
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============= Phase 1 API Routes =============
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicsRoutes);

// ============= 404 Handler =============
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.path} not found`,
    },
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
});

// ============= Error Handler (must be last) =============
app.use(errorHandler);

// ============= Start Server =============
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  🚀 Génération du Lien - Backend     ║
║     Server running on port ${String(PORT).padEnd(2)}          ║
║  http://localhost:${String(PORT).padEnd(5)} ║
╚══════════════════════════════════════╝
  `);
  logger.info("📝 Environment: " + process.env.NODE_ENV);
  logger.info(
    "🔗 CORS enabled for: " +
      (process.env.CORS_ORIGIN || "http://localhost:5173")
  );
});
