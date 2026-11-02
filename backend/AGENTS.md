# AGENTS.md — feltnotsaid Backend

## 1\. Project Overview

Project: feltnotsaid\
Directory: `backend/`

The backend is an independent REST API service for the feltnotsaid application.

### Technology Stack

- Runtime: Node.js
- Language: TypeScript
- Backend framework: Express
- ORM: Prisma 7
- Database: PostgreSQL 18.6
- Database driver: `pg`
- Prisma adapter: `@prisma/adapter-pg`
- Authentication: Clerk (planned)
- Package manager: npm

### Current Development Environment

- Node.js: 24.x
- npm: 11.x
- Prisma: 7.10.1
- PostgreSQL: 18.6

Always inspect the installed versions before making version-dependent changes.

---

## 2\. Architecture

The application uses a separate frontend and backend.

text

```text
feltnotsaid/
│
├── frontend/
│   └── Next.js application
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/generated/prisma/
│   ├── prisma7.config.ts
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
└── feltnotsaid_backend_foundation_plan.md
```

### Responsibilities

**Frontend**

- Display the user interface.
- Handle client-side interactions.
- Communicate with the backend through HTTP APIs.
- Never connect directly to PostgreSQL.

**Backend**

- Implement REST API endpoints.
- Validate incoming requests.
- Verify authentication.
- Enforce authorization.
- Implement application business rules.
- Access PostgreSQL through Prisma.

**Prisma**

- Manage the database schema.
- Generate the TypeScript client.
- Manage database migrations.
- Provide type-safe database queries.

**PostgreSQL**

- Store durable application data.
- Enforce relational constraints.
- Enforce unique identifiers and username validation.

---

## 3\. Architectural Rules

1. Keep backend functionality inside `backend/`.
2. Do not move backend business logic into frontend components.
3. Do not create another backend service without an explicit architectural requirement.
4. Keep database access exclusively on the server.
5. Never expose database credentials to the frontend.
6. Never expose Clerk secret keys to the frontend.
7. Use environment variables for secrets and configuration.
8. Keep route handlers thin and move reusable business logic into appropriate service modules.
9. Validate all incoming request data on the server.
10. Never trust client-supplied user IDs as proof of identity.

---

## 4\. TypeScript and Express Conventions

- Use TypeScript for backend application code.
- Prefer explicit types for request data, responses, and service interfaces.
- Avoid `any` unless genuinely necessary and documented.
- Use ES modules.
- Keep Express routes organized by feature.
- Centralize error handling.
- Return consistent JSON responses.
- Use appropriate HTTP status codes.
- Never expose internal stack traces or database errors to clients.

Suggested organization:

text

```text
src/
├── config/
├── lib/
│   └── prisma.ts
├── middleware/
├── routes/
├── services/
├── utils/
└── server.ts
```

Do not create unnecessary files or folders before they are needed.

---

## 5\. Database Rules

### PostgreSQL

Current development database:

- Database: `feltnotsaid`
- Application role: `feltnotsaid`
- PostgreSQL version: 18.6

A separate shadow database is configured for Prisma development migrations.

Never use the PostgreSQL superuser for application connections.

The application role must not receive unnecessary administrative privileges such as:

- SUPERUSER
- CREATEDB
- CREATEROLE

### Prisma

This project uses Prisma 7.

Important Prisma 7 conventions:

- Database configuration belongs in `prisma7.config.ts` for the current project setup.
- The schema is located at `prisma/schema.prisma`.
- The generated client is located at `src/generated/prisma`.
- PostgreSQL runtime access uses `@prisma/adapter-pg` and `pg`.
- Environment variables must be loaded correctly for both Prisma CLI commands and the application runtime.

Do not copy Prisma 6 configuration examples without checking compatibility.

### Migration Rules

- Use Prisma migrations for schema changes.
- Do not use `prisma db push` as a substitute for the migration workflow.
- Do not manually modify an already-applied migration.
- Review generated SQL before applying important migrations.
- Keep custom PostgreSQL constraints inside version-controlled migration SQL.
- Ensure the Prisma schema and custom migration constraints remain consistent.
- Never use `prisma migrate reset` without explicit approval because it can delete database data.
- Do not use production database credentials for development migrations.

Development migration command:

bash

```bash
npx prisma migrate dev --name descriptive_migration_name
```

Check migration status:

bash

```bash
npx prisma migrate status
```

Generate Prisma Client:

bash

```bash
npx prisma generate
```

---

## 6\. Current Database Model

The initial application model is deliberately minimal.

### UserProfile

text

```text
UserProfile
├── id
├── clerkUserId
├── username
├── createdAt
└── updatedAt
```

Field responsibilities:

| Field | Purpose |
| --- | --- |
| id | Internal application identifier |
| clerkUserId | Unique Clerk authentication reference |
| username | Unique application username |
| createdAt | Profile creation timestamp |
| updatedAt | Last profile update timestamp |

Database constraints:

- `id` is the primary key.
- `clerkUserId` is unique.
- `username` is unique.
- Username format is enforced using a PostgreSQL CHECK constraint.

Do not add speculative tables for future features.

---

## 7\. Username Rules

Usernames follow the agreed Instagram-style format.

### Allowed characters

- English letters: `a-z`
- Numbers: `0-9`
- Underscores: `_`
- Periods: `.`

### Length

- Minimum: 1 character.
- Maximum: 30 characters.

### Restrictions

- No spaces.
- No hyphens.
- No other special characters.
- Periods cannot appear at the beginning or end.
- Consecutive periods are not allowed.

Underscores are allowed at the beginning and end.

### Normalization

Usernames must be normalized to lowercase before database insertion.

Examples:

text

```text
Visanth       -> visanth
VISANTH       -> visanth
Visanth_01    -> visanth_01
Hello.World   -> hello.world
```

All case variations of a username represent the same username.

### Validation Responsibilities

**Frontend**

- May provide immediate format feedback.
- Must not be treated as the authority for validity or availability.

**Backend**

- Must normalize and validate every username.
- Must handle duplicate username conflicts.
- Must never trust frontend validation.

**PostgreSQL**

- Must enforce username uniqueness.
- Must enforce the agreed username format using database constraints.

The database is the final authority for uniqueness.

Do not expose a public username directory or public username search endpoint.

Username availability checks must not reveal private account information.

---

## 8\. Authentication and Authorization

Clerk integration is planned but not yet implemented.

When implementing authentication:

1. Verify Clerk authentication on the backend.
2. Use Clerk's supported server-side verification mechanisms.
3. Obtain the authenticated Clerk user ID from the verified identity.
4. Never trust a Clerk user ID supplied in the request body.
5. Protect private application endpoints.
6. Keep public endpoints public only when explicitly intended.
7. Do not store Google access tokens unnecessarily.
8. Do not equate Clerk identity with public identity.

A user's Clerk ID is an internal authentication reference, not their public identity.

---

## 9\. Product Rules

The following product decisions must be preserved.

- Authentication identity, username, and anonymous public identity are separate concepts.
- A username is not proof of real-world identity.
- Usernames are not automatically public or searchable.
- Anonymous public identity remains undecided.
- Never claim anonymity is absolute.
- Do not introduce likes or popularity scores.
- Do not introduce follower counts or public reaction rankings.
- "I felt the same" is an empathy interaction, not a popularity reaction.

Do not make unresolved product decisions without asking the developer.

---

## 10\. Security Rules

Never:

- Commit `.env` files.
- Expose database passwords.
- Expose Clerk secret keys.
- Put server secrets in `NEXT_PUBLIC_*` variables.
- Allow browser-to-database connections.
- Trust client-supplied identity information.
- Return raw SQL errors or stack traces to users.
- Grant unnecessary database privileges.
- Disable security protections simply to bypass development errors.

Always:

- Keep secrets in ignored environment files.
- Validate and normalize request data.
- Use Prisma's parameterized queries.
- Enforce authentication and authorization server-side.
- Handle database constraint violations safely.
- Restrict CORS to explicitly configured frontend origins.

---

## 11\. Development Workflow

Work incrementally.

For every feature:

1. Understand the requirement.
2. Inspect the existing implementation.
3. Check relevant official documentation.
4. Explain the planned change.
5. Implement only the requested scope.
6. Validate TypeScript.
7. Run relevant tests.
8. Inspect the Git diff.
9. Explain the result.

Do not implement multiple unrelated features in one change.

Do not install unnecessary dependencies.

Do not run `npm audit fix --force`.

### Useful Commands

Start development server:

bash

```bash
npm run dev
```

Build:

bash

```bash
npm run build
```

Type-check:

bash

```bash
npm run typecheck
```

Generate Prisma Client:

bash

```bash
npx prisma generate
```

Validate schema:

bash

```bash
npx prisma validate
```

Check migration status:

bash

```bash
npx prisma migrate status
```

---

## 12\. Implementation Roadmap

The backend foundation should be developed in these phases.

### Completed

- [x]PostgreSQL 18.6 installed and running.
- [x]Dedicated application database created.
- [x]Restricted application database role created.
- [x]Express backend initialized.
- [x]TypeScript configured.
- [x]Prisma 7.10.1 installed.
- [x]Prisma Client generated.
- [x]Initial UserProfile model created.
- [x]Username validation rules defined.
- [x]PostgreSQL username CHECK constraint added.
- [x]Initial database migration applied.

### Upcoming

**Phase 1 — Prisma integration**

- Create a reusable Prisma client module.
- Configure the PostgreSQL driver adapter.
- Keep database access server-only.
- Test an actual database query through Express.

**Phase 2 — Backend structure**

- Establish route, service, middleware, and error-handling conventions.
- Add centralized environment configuration.
- Add request validation.

**Phase 3 — Clerk integration**

- Verify authenticated sessions.
- Implement authentication middleware.
- Protect private endpoints.

**Phase 4 — Username onboarding**

- Check whether the authenticated Clerk user already has a profile.
- Validate and normalize candidate usernames.
- Create profiles safely.
- Handle duplicate username conflicts.
- Make onboarding retry-safe.

**Phase 5 — Verification**

- Test authentication.
- Test username validation.
- Test duplicate username handling.
- Test concurrent username claims.
- Verify database permissions.
- Verify secrets are not exposed.

Posts, empathy interactions, notifications, and anonymous public identity are separate future milestones.

Do not implement them as part of the initial backend foundation.

---

## 13\. Final Working Principle

Build feltnotsaid deliberately.

Prefer understandable, maintainable, secure code over unnecessary abstraction.

Inspect before changing.

Explain before implementing.

Verify before proceeding.

Preserve existing work and unresolved product decisions.

Complete one milestone before starting another.
