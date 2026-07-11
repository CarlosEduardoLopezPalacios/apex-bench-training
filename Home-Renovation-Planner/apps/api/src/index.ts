import { sequelize } from "#app/config/database";
import { env } from "#app/config/env";
import "#app/models/index";
import { createApp } from "#app/app";

async function start() {
  await sequelize.authenticate();

  /**
   * Development-only.
   * Later this should be replaced with Sequelize migrations.
   */
  await sequelize.sync({ alter: true });

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`API running on port ${env.PORT}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
