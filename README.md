# @kniho-hlod/kniho-hlod-service

Shared glue layer for the kniho-hlod project. Published to GitHub Packages and consumed by both the backend and the frontend.

It provides:
- **Entity definitions** — single source of truth for model configs (backend) and DTOs (frontend)
- **DTO classes** — typed data transfer objects for all entities
- **Service classes** — HTTP client wrappers used by the frontend to call the backend API
- **Service container** — pre-configured instance of all services, initialized once in `main.ts`

## Table of Contents

- [Installation](#installation)
- [Architecture](#architecture)
- [Entities](#entities)
  - [defineEntity](#defineentity)
  - [userScoped entities](#userscoped-entities)
- [DTOs](#dtos)
- [Services](#services)
  - [configureServices](#configureservices)
  - [getServices](#getservices)
- [Development](#development)

---

## Installation

The package is published to GitHub Packages. Add an `.npmrc` file to your project:

```
@kniho-hlod:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then install:

```bash
npm install @kniho-hlod/kniho-hlod-service
```

---

## Architecture

Each entity is defined once using `defineEntity`. From that single definition, three things are derived automatically:

| Derived artifact | Used by  | Purpose                                      |
|-----------------|----------|----------------------------------------------|
| `entity.config` | Backend  | Sequelize model config passed to `be-core`   |
| `entity.Dto` etc. | Both   | TypeScript DTO classes                       |
| `entity.Service` | Frontend | HTTP client for the entity's REST endpoints |

This ensures the backend model, the DTOs, and the frontend service always stay in sync.

---

## Entities

### defineEntity

Defines an entity and derives its model config, DTOs, and service class.

```typescript
import { defineEntity } from '@kniho-hlod/kniho-hlod-service';

export const noteEntity = defineEntity({
  name: 'note',
  prefix: 'n',
  basePath: '/api/notes',   // frontend HTTP base path (default: /api/{name}s)
  userScoped: true,         // scope to authenticated user (see below)
  fields: {
    content: { type: 'TEXT', required: true },
    ownerId: { type: 'STRING', required: true },
  },
});
```

**Options:**

| Option        | Type      | Description                                                            |
|---------------|-----------|------------------------------------------------------------------------|
| `name`        | `string`  | Entity name — used as Sequelize model name and in default route path   |
| `prefix`      | `string`  | Short prefix for generated IDs (e.g. `'n'` → `'n_abc123...'`)         |
| `basePath`    | `string`  | HTTP base path for the frontend service (default: `/api/{name}s`)      |
| `routePath`   | `string`  | Override the backend route path if it differs from `basePath`          |
| `userScoped`  | `boolean` | Scope all routes to the authenticated user (see below)                 |
| `serviceType` | `'crud' \| 'file'` | Use `'file'` for file upload entities (default: `'crud'`)   |
| `fields`      | `Fields`  | Field definitions (type, required, validations)                        |
| `extend`      | `fn`      | Extend the generated service class with custom methods                 |

**Field types:** `STRING`, `TEXT`, `INTEGER`, `BOOLEAN`, `DATE`, `BLOB`

**Field options:**

| Option      | Description                                              |
|-------------|----------------------------------------------------------|
| `required`  | Field is required (in both DB and create DTO)            |
| `writeOnly` | Excluded from read DTO (e.g. passwords, binary blobs)    |
| `default`   | Default value                                            |
| `maxLength` | Maximum string length                                    |
| `minLength` | Minimum string length                                    |
| `min`       | Minimum numeric value                                    |
| `max`       | Maximum numeric value                                    |

### userScoped entities

Setting `userScoped: true` on an entity does two things:

1. **Backend**: the `be-core` CRUD router requires a valid JWT on all routes and filters `GET /` to only return records where `ownerId` matches the authenticated user's ID (extracted from the JWT — not from the request).
2. **Frontend**: the service class extends `AbstractUserScopedCrudService` instead of the plain `AbstractCrudService`.

The entity must have an `ownerId` field for this to work correctly.

```typescript
export const bookEntity = defineEntity({
  name: 'book',
  prefix: 'b',
  basePath: '/api/books',
  userScoped: true,
  fields: {
    title: { type: 'STRING', required: true },
    ownerId: { type: 'STRING', required: true },
    // ...
  },
});
```

### Extending a service

Use the `extend` option to add custom methods to the generated service class:

```typescript
export const loanEntity = defineEntity({
  name: 'loan',
  prefix: 'l',
  basePath: '/api/loans',
  userScoped: true,
  fields: { /* ... */ },
  extend: (Base) =>
    class extends (Base as any) {
      getByBook(bookId: string) {
        return this.get(`/api/loans?bookId=${bookId}`);
      }
    },
});
```

---

## DTOs

Each entity exposes three DTO classes:

```typescript
import { BookDto, CreateBookDto, UpdateBookDto } from '@kniho-hlod/kniho-hlod-service';

const book = new BookDto({ title: 'Dune', isAvailable: true });
```

| Class           | Fields                                      |
|-----------------|---------------------------------------------|
| `Dto`           | Read DTO — all readable fields + `id`, `createdAt`, `updatedAt` |
| `CreateDto`     | All fields (including `writeOnly`)          |
| `UpdateDto`     | All fields optional                         |

Available entities: `BookDto`, `LoanDto`, `UserDto`, `ProfileImageDto` (and their `Create`/`Update` variants).

---

## Services

### configureServices

Initializes the service container. Call this once at app startup before any store or component accesses the API.

```typescript
import { configureServices } from '@kniho-hlod/kniho-hlod-service';

configureServices(
  'https://my-backend.example.com',
  () => localStorage.getItem('auth-token')
);
```

| Argument        | Type                   | Description                              |
|-----------------|------------------------|------------------------------------------|
| `baseUrl`       | `string`               | Backend base URL                         |
| `tokenProvider` | `() => string \| null` | Returns the current JWT (or `null`)      |

### getServices

Returns the configured service container. Throws if `configureServices` has not been called.

```typescript
import { getServices } from '@kniho-hlod/kniho-hlod-service';

const books = await getServices().books.getAll();
const loan = await getServices().loans.create({ ... });
```

**Available services:**

| Service  | Entity        |
|----------|---------------|
| `auth`   | Authentication (login) |
| `books`  | Books         |
| `loans`  | Loans         |
| `users`  | Users         |
| `files`  | Profile images |

---

## Development

### Build

```bash
npm run build
```

### Watch mode

```bash
npm run dev
```

### Update dependencies

```bash
npm run core-update   # pull latest be-core and service-core
```

### Workflow

When the data model changes:

1. Update the entity definition in this package
2. Build and publish this package
3. Run `npm run service-update` in the backend and frontend

### Publishing

Publishing happens automatically via GitHub Actions on push to `main` or `dev`.

---

## License

ISC — [Eleansphere](https://github.com/Eleansphere)
