# @complit/api

Minimal Fastify TypeScript API for the Complit monorepo. Uses in-memory storage and is intended for local development and prototyping.

Quick start (from repo root):

```bash
# install dependencies for the monorepo (example with pnpm)
pnpm install

# start the api in dev mode
pnpm --filter @complit/api dev
```

API endpoints (default host `http://localhost:3000`):

- `GET /goals` — list goals
- `POST /goals` — create goal
- `GET /goals/:id` — get goal
- `PUT /goals/:id` — update goal
- `DELETE /goals/:id` — delete goal

- `GET /milestones` — list milestones
- `POST /milestones` — create milestone
- `GET /milestones/:id` — get milestone
- `PUT /milestones/:id` — update milestone
- `DELETE /milestones/:id` — delete milestone

- `GET /evidence` — list evidence (optional `?goalId=` filter)
- `POST /evidence` — create evidence
- `GET /evidence/:id` — get evidence
- `PUT /evidence/:id` — update evidence
- `DELETE /evidence/:id` — delete evidence

Notes:
- This is in-memory storage; restarting the server clears data.
- For production, replace in-memory stores with a database and add input validation and authentication.
