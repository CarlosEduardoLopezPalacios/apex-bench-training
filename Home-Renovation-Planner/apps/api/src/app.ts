import cors from "cors";
import express from "express";
import { env } from "#app/config/env";
import { errorHandler } from "#app/middleware/error-handler";
import { notFoundHandler } from "#app/middleware/not-found-handler";
import { requireJsonContent } from "#app/middleware/require-json-content";
import { projectRoutes } from "#app/routes/projects.routes";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(requireJsonContent);
  app.use(express.json({ limit: env.JSON_BODY_LIMIT, strict: true }));

  app.get("/health", (_req, res) => {
    return res.json({
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    });
  });

  app.use("/api/projects", projectRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
