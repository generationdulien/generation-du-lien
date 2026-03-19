import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

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
// TO BE IMPLEMENTED BY Agent Back
// - POST /api/auth/register
// - POST /api/auth/verify-email
// - POST /api/auth/login
// - GET /api/topics
// - GET /api/topics/:id

// ============= Error Handler =============
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Error:", err);
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
  }
);

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

// ============= Start Server =============
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  🚀 Génération du Lien - Backend     ║
║     Server running on port ${String(PORT).padEnd(2)}          ║
║  http://localhost:${String(PORT).padEnd(5)} ║
╚══════════════════════════════════════╝
  `);
  console.log("📝 Environment:", process.env.NODE_ENV);
  console.log(
    "🔗 CORS enabled for:",
    process.env.CORS_ORIGIN || "http://localhost:5173"
  );
});
