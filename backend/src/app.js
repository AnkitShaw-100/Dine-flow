import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { clerkMiddleware } from "@clerk/express";

import { healthRouter } from "./routes/health.js";
import { v1Router } from "./routes/v1/index.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

export function createApp(env) {
  const app = express();

  app.set("trust proxy", 1);

  const allowedOrigins = Array.isArray(env.CORS_ORIGINS)
    ? env.CORS_ORIGINS
    : [];

  const corsOptions = {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // Allow Vercel preview/prod frontends without requiring per-deploy env updates.
      if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 200,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    }),
  );

  // Clerk must run early so req.auth is available
  app.use(clerkMiddleware());

  app.use(healthRouter);
  app.get("/",(req,res)=>{res.send("hello")})
  app.use("/v1", v1Router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
