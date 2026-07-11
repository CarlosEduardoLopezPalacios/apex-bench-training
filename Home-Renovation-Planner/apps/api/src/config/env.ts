import dotenv from "dotenv";
import { z } from "zod/v4";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().int().positive().max(65_535).default(4000),
  CORS_ORIGIN: z.string().min(1).default("http://localhost:3000"),
  JSON_BODY_LIMIT: z.string().min(1).default("1mb"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration", result.error.flatten());
  throw new Error("Invalid environment configuration");
}

export const env = result.data;
