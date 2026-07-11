# Home Renovation Planner

AI-powered application for organizing home renovation projects, spaces, budgets, tasks, and contextual recommendations.

## Current status

The repository currently contains the Express API. The Next.js frontend and shared package are planned but have not been created yet.

## Requirements

- Node.js 22 or newer
- pnpm 11.9.0
- Docker with Docker Compose

## Local setup

1. Install workspace dependencies:

   ```bash
   pnpm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env
   ```

   On PowerShell, use `Copy-Item .env.example .env`.

3. Start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

4. Start the API:

   ```bash
   pnpm dev
   ```

The API runs on `http://localhost:4000` by default. Its health endpoint is `GET /health`.

## Workspace commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the API in watch mode |
| `pnpm dev:api` | Start only the API |
| `pnpm dev:web` | Start the frontend after `apps/web` is added |
| `pnpm build` | Build every workspace package that defines a build script |
| `pnpm typecheck` | Type-check every workspace package that defines a typecheck script |

## Repository structure

```text
apps/
  api/       Express and Sequelize API
docs/        Product description and roadmap
```

See [the project description](docs/PROJECT_DESCRIPTION.md) and [the roadmap](docs/ROADMAP.md) for product scope and planned work.
