import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import "./models";

import { projectRoutes } from "./routes/projects.routes";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/projects", projectRoutes);

app.use(errorHandler);

async function start() {
  await sequelize.authenticate();

  /**
   * Development-only.
   * Later this should be replaced with Sequelize migrations.
   */
  await sequelize.sync({ alter: true });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});