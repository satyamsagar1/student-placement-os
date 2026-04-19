# 03 - Architecture Documentation

## Purpose

Defines the backend architecture, folder structure, coding standards, request flow, and engineering rules for Student Placement OS.

---

## Architecture Style

**Modular Monolith**

Reason:

* Fast to build
* Easy to maintain
* Scales cleanly in early stages
* Better than premature microservices

---

## Root Structure

```text
src/
  modules/
  shared/
  app.js
  server.js
```

---

## Modules Structure (Feature First)

```text
src/modules/
  auth/
  users/
  applications/
  resumes/
  reminders/
  dashboard/
```

Each module should contain:

```text
<module-name>.routes.js
<module-name>.controller.js
<module-name>.service.js
<module-name>.validation.js
<module-name>.model.js
```

Example:

```text
modules/applications/
  application.routes.js
  application.controller.js
  application.service.js
  application.validation.js
  application.model.js
```

---

## Shared Structure

```text
src/shared/
  config/
  database/
  middleware/
  utils/
  constants/
```

### Shared Responsibilities

* DB connection
* JWT helpers
* Error handler
* Async wrapper
* Reusable utilities
* App constants

---

## Request Flow

```text
Route -> Controller -> Service -> Model -> Response
```

### Rules

* Routes define endpoints only.
* Controllers handle req/res only.
* Services contain business logic.
* Models manage database schemas.
* Validation runs before controller.

---

## Controller Rules

Controllers must stay thin.

Allowed:

* Read req params/body/query
* Call service
* Return response
* Forward errors

Avoid:

* Business logic
* Complex DB queries
* Large condition trees

---

## Service Rules

Services contain:

* Business rules
* DB operations
* Reusable workflows
* Decision logic

Services must not use:

* res.status()
* req object
* Express response methods

---

## Naming Conventions

### Files

```text
application.routes.js
application.controller.js
application.service.js
```

### Variables / Functions

* camelCase for variables/functions
* PascalCase for models/classes
* UPPER_CASE for constants/env names

### Routes

Use plural nouns:

```text
/api/applications
/api/users
/api/reminders
```

---

## API Response Standard

### Success

```json
{
  "success": true,
  "message": "Application created",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {}
}
```

---

## Error Handling Strategy

Use centralized global error middleware.

Examples:

* ValidationError -> 400
* Unauthorized -> 401
* Forbidden -> 403
* NotFound -> 404
* ServerError -> 500

---

## Authentication Strategy

Use JWT access token initially.

Flow:

```text
Login -> Generate Token -> Protected Routes verify token
```

Later:

* Refresh tokens
* OAuth
* Session management

---

## Environment Variables

```text
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=
CLIENT_URL=
```

Use `.env` and never commit secrets.

---

## Validation Strategy

Use Joi or Zod.

Validate:

* body
* params
* query

Never trust raw request input.

---

## Database Rules

* Use timestamps on models
* Use indexes where needed
* Keep schemas lean
* Use references only when useful
* Avoid overpopulation queries

---

## Logging Rules

Log:

* startup events
* auth failures
* critical errors
* scheduled jobs

Avoid noisy console spam.

---

## Future Scaling Path

1. Add tests
2. Add caching
3. Add queues
4. Extract modules into services only when needed

---

## Non-Negotiable Engineering Rules

1. Thin controllers
2. Business logic in services
3. Reusable shared utilities
4. No giant files
5. Keep naming consistent
6. Document major decisions
7. Build simple first
