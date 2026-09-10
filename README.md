# Learning Portfolio — JavaScript Full-stack

A public learning portfolio that documents building a JavaScript full-stack
application layer by layer: JavaScript fundamentals, then a REST API, then
PostgreSQL, then React, then testing.

The repository contains two applications:

| Directory | Application | Status |
|---|---|---|
| `src/`, `migrations/` | Task Manager REST API — Node.js, Express, PostgreSQL | Complete (weeks 1–3) |
| `client/` | Watchlist — React frontend for a movie and anime watchlist | In progress (week 4 onward) |

The Task Manager was the practice app for the backend layers and is kept as
finished work. The frontend layers are learned on the Watchlist instead, so the
React lessons produce a more visual product. The Watchlist backend is built in
week 5.

## What this project demonstrates

- CRUD operations and input validation in JavaScript.
- REST API design with appropriate HTTP methods and status codes.
- Separation of responsibilities: Route → Controller → Service → Repository.
- Centralized Express error handling.
- PostgreSQL schema, migrations, and parameterized queries.
- Filtering, sorting, and pagination driven by query strings.
- React components, props, state, and derived rendering.
- Incremental development through small branches, commits, tests, and reviews.

## Task Manager API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check that the server is running |
| `GET` | `/tasks` | List tasks, with optional `completed`, `sort`, `page`, and `limit` |
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks/:id` | Get a task by ID |
| `PATCH` | `/tasks/:id/complete` | Mark a task as completed |
| `PATCH` | `/tasks/:id` | Update a task title |
| `DELETE` | `/tasks/:id` | Delete a task |

### Run the API

Requirements: Node.js 20 or newer, PostgreSQL 14 or newer.

```bash
git clone https://github.com/nhidinhny/learnJS.git
cd learnJS
npm install
```

Create the database and run the migration:

```bash
createdb task_manager
psql -d task_manager -f migrations/001_create_tasks.sql
```

Start the server:

```bash
npm run dev
```

The API is available at `http://localhost:7777`.

```bash
curl http://localhost:7777/health
```

Expected response:

```json
{"status":"ok"}
```

Manual request scenarios are collected in `docs/test-command.md`.

## Watchlist frontend

```bash
cd client
npm install
npm run dev
```

The app is available at `http://localhost:5173`. See `client/README.md` for
details.

## Verify

```bash
npm run check
```

```bash
cd client && npm run lint
```

## Project structure

```text
migrations/
└── 001_create_tasks.sql  # Create the PostgreSQL tasks table
src/
├── db.js                 # PostgreSQL connection pool
├── index.js              # Original command-line learning demo
├── server.js             # Express routes and middleware
├── taskController.js     # HTTP request/response handling
├── taskRepository.js     # PostgreSQL task queries
└── taskService.js        # Validation and business logic
client/
└── src/                  # React watchlist frontend
```

## Learning roadmap

- [x] JavaScript fundamentals and array methods.
- [x] Express REST API.
- [x] Controller and centralized error-handling layers.
- [x] PostgreSQL repository layer.
- [x] Filtering, sorting, and pagination.
- [ ] React user interface (in progress).
- [ ] Watchlist API and TMDB integration.
- [ ] Accounts and authorization.
- [ ] Automated unit, API, and component tests.
