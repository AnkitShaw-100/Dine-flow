import dotenv from "dotenv";
import { z } from "zod";
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173,https://try-dine-flow.vercel.app")
    .transform((val) => val.split(",").map((s) => s.trim()).filter(Boolean)),
  MONGODB_URI: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_SIGN_IN_URL: z.string().optional(),
  CLERK_SIGN_UP_URL: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  FRONTEND_URL: z.string().url().default("https://try-dine-flow.vercel.app"),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  process.exit(1);
}

const env = parsed.data;

await connectDb(env);
const app = createApp(env);

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
