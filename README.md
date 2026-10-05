# TaskFlow — Task Management Application

TaskFlow is a responsive, full-stack task manager built with Next.js App Router, React, TypeScript, MongoDB Atlas, Mongoose, JWT sessions, bcrypt, and Zod.

## Features

- Register, sign in, and sign out
- Password hashing with bcrypt
- Signed JWT session in an HTTP-only, SameSite cookie
- User-scoped task access on every task API operation
- Create, view, update, and delete tasks
- Statuses: To do, In progress, Completed
- Priorities: Low, Medium, High
- Optional due dates and descriptions
- Search by title/description and filter by status/priority
- Dashboard statistics and responsive layout

## Requirements

- Node.js 20.9 or newer (Node.js 22 LTS recommended)
- npm
- MongoDB Atlas cluster or a local MongoDB server

## Run locally

1. Open this folder in a terminal.
2. Install packages: `npm install`
3. Copy `.env.example` to `.env.local`.
4. Set `MONGODB_URI` to your MongoDB connection string. In Atlas, allow your development IP in Network Access and create a database user with a strong password.
5. Set `AUTH_SECRET` to a long random secret (32+ characters). You can generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
6. Start the app: `npm run dev`
7. Visit `http://localhost:3000`.

Never commit `.env.local`, database credentials, or production secrets.

## Quality checks

- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint check
- `npm run build` — production build
- `npm start` — serve the production build

## API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account and session |
| POST | `/api/auth/login` | Authenticate and create a session |
| POST | `/api/auth/logout` | Clear the session |
| GET | `/api/auth/me` | Return the current user |
| GET | `/api/tasks` | List the signed-in user's tasks; supports `q`, `status`, `priority` |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update one of the signed-in user's tasks |
| DELETE | `/api/tasks/:id` | Delete one of the signed-in user's tasks |

## Security notes

- Passwords are never stored in plaintext.
- Session cookies are HTTP-only, SameSite=Lax, and Secure in production.
- Every task read/update/delete query is scoped to the authenticated user's ID.
- Validate and keep secrets in environment variables; use HTTPS in production.

## Not included yet

WebSocket-based live synchronization is an optional future enhancement; the current app uses standard HTTP requests and refreshes its task list after mutations.

## Deployment

Deploy the repository as a Next.js project on Vercel and configure `MONGODB_URI` and `AUTH_SECRET` for Production, Preview, and Development as appropriate. Ensure your MongoDB Atlas Network Access rules permit the deployed application to connect.