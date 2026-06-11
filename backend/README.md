# Gatherly Backend

This folder contains the backend API for Gatherly.

The backend is built with Node.js, Express, PostgreSQL/Neon, JWT authentication, cookie-based auth handling, validation middleware, and centralized error handling.

## Tech Stack

* Node.js v24.11.0
* Express
* PostgreSQL / Neon
* JWT / cookie-based authentication
* Password hashing with Node `crypto.scrypt`
* dotenv
* helmet
* cors
* morgan
* express-rate-limit
* node-pg-migrate

## Local Setup

From the project root:

```bash
cd backend
npm install
npm run dev
```

The backend runs locally on:

```text
http://localhost:8080
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

Local development example:

```env
PORT=8080
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
JWT_LIFETIME=1d
AUTH_COOKIE_NAME=gatherly_auth
CORS_ORIGIN=http://localhost:5173
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
NODE_ENV=development
```

Production deployment example:

```env
DATABASE_URL=your_production_postgres_database_url
JWT_SECRET=your_long_random_secret
JWT_LIFETIME=1d
AUTH_COOKIE_NAME=gatherly_auth
CORS_ORIGIN=https://your-frontend-service.onrender.com
COOKIE_SECURE=true
COOKIE_SAMESITE=none
NODE_ENV=production
```

Do not commit real `.env` values, database URLs, or secret keys.

## Available Scripts

```bash
npm run dev
npm start
npm run migrate:up
npm run migrate:down
npm run migrate:create -- migration_name
```

## Migration Notes

This project uses `node-pg-migrate`.

Node.js `>= 20.11.0` is required for migration tooling.

```bash
npm run migrate:up
```

Applies migrations and creates the database schema.

```bash
npm run migrate:down
```

Rolls back the latest migration.

Since the team shares one database, only one person should need to run migrations for the shared environment.

## API Route Areas

Main backend route areas include:

* Auth routes
* Group routes
* Member routes
* Event routes
* Idea routes
* Health check route

Current route details are documented in the root `README.md`.

## API Notes

* Auth uses an HttpOnly cookie flow.
* Bearer token fallback is available for API testing and older clients.
* Protected routes require authentication.
* Group-specific routes require group membership authorization where applied.
* API responses use a consistent success/error response structure.

## Backend Docs

Additional backend notes are in the `backend/docs` folder:

```text
backend/docs/api-routes.md
backend/docs/api-testing-examples.md
backend/docs/sql-crud-guidelines.md
```

## License

This project is for educational purposes only.
