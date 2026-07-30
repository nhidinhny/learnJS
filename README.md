# Pre-fresher Task Manager

A learning project that grows from JavaScript fundamentals into a
full-stack task management application. The current stable version provides a
REST API built with Node.js and Express, with an in-memory service layer.

## What this project demonstrates

- CRUD operations and input validation in JavaScript.
- REST API design with appropriate HTTP methods and status codes.
- Separation of responsibilities: Route → Controller → Service.
- Centralized Express error handling.
- Incremental development through small branches, commits, tests, and reviews.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check that the server is running |
| `GET` | `/tasks` | List all tasks |
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks/:id` | Get a task by ID |
| `PATCH` | `/tasks/:id/complete` | Mark a task as completed |
| `PATCH` | `/tasks/:id` | Update a task title |
| `DELETE` | `/tasks/:id` | Delete a task |

## Run locally

Requirements: Node.js 18 or newer.

```bash
git clone https://github.com/nhidinhny/task-manager-learning.git
cd task-manager-learning
npm install
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

## Verify

```bash
npm test
npm run check
```

## Project structure

```text
src/
├── server.js          # Express routes and middleware
├── taskController.js  # HTTP request/response handling
├── taskService.js     # Validation and business logic
└── index.js           # Original command-line learning demo
test/
└── taskService.test.js
```

## Learning roadmap

- [x] JavaScript fundamentals and array methods.
- [x] Express REST API.
- [x] Controller and centralized error-handling layers.
- [ ] PostgreSQL repository layer.
- [ ] Automated API integration tests.
- [ ] React user interface.
