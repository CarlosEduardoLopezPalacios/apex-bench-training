# Layered Backend Architecture Skill

## Purpose

Use this skill when generating or modifying backend code for the Home Renovation Planner API.

The backend must follow a clear layered architecture so the code remains maintainable, testable, and easy to review.

## Required Architecture

Always use this structure:

```txt
Route
  ↓
Validation Middleware / Zod Schema
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Sequelize Model
  ↓
PostgreSQL
```

## Layer Responsibilities

### Routes

Routes only define:

- HTTP paths
- HTTP methods
- Middleware composition
- Controller binding

Routes must not contain:

- Business logic
- Sequelize calls
- Request transformation beyond middleware wiring
- Manual validation logic

Example:

```ts
projectRoutes.post(
  "/",
  validateRequest(createProjectSchema),
  createProject
);
```

---

### Controllers

Controllers only handle HTTP concerns.

Controllers are responsible for:

- Reading `req.params`, `req.body`, and `req.query`
- Calling the correct service method
- Returning HTTP status codes
- Returning response payloads

Controllers must not:

- Call Sequelize models directly
- Contain business rules
- Contain database queries
- Perform complex validation
- Catch errors manually unless there is a specific HTTP reason

All async controllers must use `asyncHandler`.

Preferred response shape:

```ts
res.status(201).json({
  data: result,
});
```

For delete operations:

```ts
res.status(204).send();
```

---

### Services

Services contain application and business logic.

Services are responsible for:

- Coordinating repositories
- Applying business rules
- Checking whether entities exist
- Throwing `HttpError` for expected application errors
- Preparing data for persistence when needed

Services may call repositories.

Services must not:

- Directly access Sequelize models
- Know Express `Request` or `Response`
- Return raw HTTP responses

Example:

```ts
const project = await projectsRepository.findById(projectId);

if (!project) {
  throw new HttpError(404, "Project not found");
}
```

---

### Repositories

Repositories are the only layer allowed to call Sequelize models directly.

Repositories are responsible for:

- Creating records
- Querying records
- Updating records
- Deleting records
- Defining Sequelize includes
- Defining ordering and database query options

Repositories must not:

- Read Express request objects
- Return HTTP responses
- Throw HTTP-specific errors unless explicitly requested
- Contain business workflows

Example:

```ts
return Project.findAll({
  include: [{ model: Space, as: "spaces" }],
  order: [["createdAt", "DESC"]],
});
```

---

### Models

Models only define database structure and associations.

Models are responsible for:

- Sequelize attributes
- Table names
- Field mappings
- Data types
- Model-level configuration

Models must not:

- Contain business logic
- Contain controller logic
- Contain service workflows
- Perform request validation

Use:

```ts
underscored: true
```

Database columns should use `snake_case`.

TypeScript properties should use `camelCase`.

Example:

```ts
budgetMxn: {
  type: DataTypes.DECIMAL,
  allowNull: true,
  field: "budget_mxn",
}
```

---

### Schemas

Use Zod schemas for incoming request validation.

Schemas are responsible for:

- Validating request bodies
- Validating request params when needed
- Validating request query params when needed
- Exporting inferred TypeScript types

Example:

```ts
export type CreateProjectInput = z.infer<
  typeof createProjectSchema
>["body"];
```

---

### Middleware

Use middleware for cross-cutting concerns.

Required middleware patterns:

- `validateRequest` for Zod validation
- `asyncHandler` for async controller error forwarding
- `errorHandler` for centralized error responses

All errors should go through `errorHandler`.

---

## Error Handling

Use `HttpError` for expected application errors.

Examples:

- Entity not found
- Invalid state transition
- Unauthorized access
- Forbidden operation

Example:

```ts
throw new HttpError(404, "Project not found");
```

Unexpected errors should be handled by the global `errorHandler`.

Never expose raw internal error details to the client.

---

## Import Style

For this project, use extensionless imports.

Correct:

```ts
import { sequelize } from "../config/database";
import { Project } from "../models";
```

Avoid:

```ts
import { sequelize } from "../config/database.js";
```

This assumes the backend TypeScript config uses:

```json
{
  "module": "CommonJS",
  "moduleResolution": "Node"
}
```

---

## Naming Conventions

Use consistent names across the project.

### Files

```txt
projects.routes.ts
projects.controller.ts
projects.service.ts
projects.repository.ts
project.schema.ts
project.model.ts
```

### Variables and methods

Use `camelCase`.

Examples:

```ts
projectId
budgetMxn
getProjectById
createProject
```

### Database

Use `snake_case`.

Examples:

```txt
project_id
budget_mxn
created_at
updated_at
```

---

## API Response Convention

Successful responses should use:

```ts
{
  data: ...
}
```

Validation errors should use:

```ts
{
  error: {
    message: "Validation error",
    details: ...
  }
}
```

Application errors should use:

```ts
{
  error: {
    message: "Project not found"
  }
}
```

---

## Code Generation Rules

When generating a new feature, create or update files in this order:

1. Model
2. Associations in `models/index.ts`
3. Schema
4. Repository
5. Service
6. Controller
7. Routes
8. Register routes in `src/index.ts`
9. Add tests or examples when requested

Do not skip layers unless explicitly instructed.

---

## Review Checklist

Before considering generated code complete, verify:

- No controller calls Sequelize directly.
- No service imports Express types.
- No repository returns HTTP responses.
- Zod validation exists for request payloads.
- Async controllers use `asyncHandler`.
- Expected errors use `HttpError`.
- Sequelize associations use the correct aliases.
- TypeScript does not use `any` unless documented.
- API responses follow the project convention.
- Imports do not include `.js` extensions.
- Naming is consistent between TypeScript and PostgreSQL.

---

## Example Feature Request Format

When asked to implement a feature, follow this structure:

```txt
Feature: Spaces CRUD

Required layers:
- space.model.ts
- models/index.ts association updates
- space.schema.ts
- spaces.repository.ts
- spaces.service.ts
- spaces.controller.ts
- spaces.routes.ts
- src/index.ts route registration

Rules:
- Validate input with Zod.
- Use asyncHandler in controllers.
- Services must throw HttpError for not found cases.
- Repositories are the only layer that can access Sequelize models.
```

---

## Default Behavior

If the user asks for backend code and does not specify an architecture, automatically apply this skill.

Prefer small, reviewable changes over large rewrites.
