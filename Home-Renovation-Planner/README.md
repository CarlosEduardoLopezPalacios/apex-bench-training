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
   cp .env.example apps/api/.env
   ```

   On PowerShell, use `Copy-Item .env.example apps/api/.env`.

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

See [the project description](docs/PROJECT_DESCRIPTION.md), approved [domain decisions](docs/DOMAIN_DECISIONS.md), [the roadmap](docs/ROADMAP.md), and the actionable [PR plan](docs/PR_PLAN.md) for product scope and implementation progress.

## Engineering rules

Backend changes must follow the mandatory layered architecture documented in [Backend Architecture](docs/BACKEND_ARCHITECTURE.md). The key rules are:

- Validate `body`, `params`, and `query` with strict Zod schemas.
- Read validated input from `res.locals.validated`.
- Use explicit DTO mappers between HTTP, service, and persistence boundaries.
- Services and repositories accept and return DTOs; they never receive Express request objects or expose Sequelize model instances.
- Use `#app/*` aliases for internal API imports.
- Keep successful responses under `{ data: ... }` and errors under `{ error: ... }`.

AI coding agents must also follow [AGENTS.md](AGENTS.md), which contains the enforceable repository instructions.
