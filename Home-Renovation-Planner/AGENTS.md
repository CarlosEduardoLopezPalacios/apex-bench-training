# Codex rules for Home Renovation Planner

These instructions apply to the entire repository. Read `docs/BACKEND_ARCHITECTURE.md` before modifying the API and `docs/DOMAIN_DECISIONS.md` before changing domain behavior or data contracts.

## Mandatory backend flow

Use every layer in this order:

```text
Route -> Zod schema -> validateRequest -> Controller -> DTO mapper -> Service -> Repository -> Sequelize model
```

Do not skip a layer unless the user explicitly requests an architectural change.

## Non-negotiable boundaries

- Routes only declare paths, methods, middleware, and controller bindings.
- Validate every external `body`, `params`, and `query` with Zod `strictObject` schemas.
- Controllers read validated input only from `res.locals.validated`; never pass Express request objects or schema-inferred request objects to services.
- Controllers map validated input to input DTOs before calling services and map returned DTOs to typed HTTP responses.
- Services contain business rules and depend only on DTOs and repositories. They must not import Express, Zod schemas, Sequelize models, or HTTP request/response types.
- Repositories contain persistence operations. They must not import Express or Zod schemas and must not expose Sequelize models outside the repository boundary.
- Service and repository public functions must accept and return DTOs. Sequelize model instances are repository implementation details.
- Models define persistence structure and associations only.
- Expected application errors use `HttpError`; unexpected errors go through `errorHandler`.

## API contracts

- Use `ValidatedResponse<TValidatedRequest, TResponseBody>` with both generic arguments.
- Successful JSON responses use `{ data: ... }`.
- Error responses use `{ error: { message, details? } }`.
- Delete endpoints return `204` without a response body.
- Reject unknown request properties with `z.strictObject`.
- Requests with a body must use `application/json`, except dedicated upload endpoints. Image uploads must use multipart or direct object-storage uploads with a separate size limit.

## Imports and naming

- Use `#app/*` for all internal API imports. Do not introduce relative internal imports.
- Use extensionless TypeScript imports.
- Use `camelCase` in TypeScript and `snake_case` in PostgreSQL.
- Use `underscored: true` in Sequelize models.
- Avoid `any`; document the reason if it is unavoidable.

## Verification

Before completing API work, run type-check and build. Add or update tests when the affected feature has a test suite.
