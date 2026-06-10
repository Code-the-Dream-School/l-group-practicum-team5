# Gatherly

Gatherly is a full-stack planning app for families, couples, friends, and small groups who want one shared place to organize time together. Users can register, log in, create or join groups, plan upcoming events, and keep a shared list of future activity ideas.

## Live Demo

* Frontend: https://l-group-practicum-team5-1.onrender.com/
* Backend: https://l-group-practicum-team5.onrender.com/ 
* Frontend folder: `frontend/`
* Backend folder: `backend/`

## Problem Statement

People often want to spend more time with friends, family, or small groups, but planning can become scattered across messages, calendars, and separate apps. Ideas can get forgotten, event details can be missed, and it can be hard to keep everyone on the same page.

Gatherly helps solve this by providing one shared space where groups can plan events, track ideas, and organize time together more easily.

## Features

* User registration and login
* Cookie-based authentication
* Protected frontend/backend routes
* Create groups
* Join groups with an invite code
* View group members
* Create and view events
* Track event status as `planned`, `cancelled`, or `completed`
* Shared ideas feature
* Backend validation and authorization checks
* Consistent API success/error response structure

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* ESLint

### Backend

* Node.js v24.11.0
* Express
* REST API
* JWT / cookie-based authentication
* Password hashing with Node `crypto.scrypt`
* PostgreSQL / Neon

### Design, Testing, Deployment, and Collaboration Tools

* Figma
* Postman
* Render
* Git / GitHub
* Jira
* Slack
* dotenv
* ESLint / Prettier

## Project Structure

```text
project-root/
├── backend/
│   ├── docs/
│   │   ├── api-routes.md
│   │   ├── api-testing-examples.md
│   │   └── sql-crud-guidelines.md
│   ├── migrations/
│   ├── scripts/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── errors/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validations/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── docs/
│   │   └── wireframes/
│   ├── src/
│   │   ├── components/
│   │   ├── Dashboard/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

## Setup and Installation

### Prerequisites

* Node.js v20.11.0 or later
* npm
* PostgreSQL database or Neon database URL

The team used Node.js v24.11.0 during development.

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder.

Example variable names:

```env
PORT=8080
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
JWT_LIFETIME=1d
AUTH_COOKIE_NAME=your_cookie_name
CORS_ORIGIN=http://localhost:5173
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
```

Do not commit real `.env` values.

Backend runs locally on:

```text
http://localhost:8080
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend` folder if needed.

```env
VITE_API_URL=http://localhost:8080/api
```

Frontend runs locally on:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run dev
npm start
npm run migrate:up
npm run migrate:down
npm run migrate:create -- migration_name
```

## Migration Notes

The migration tooling uses `node-pg-migrate`, which requires Node.js `>= 20.11.0`.

`npm run migrate:up` applies migrations and creates the database schema.

`npm run migrate:down` rolls back the latest migration. Since this project currently has one migration, running it will remove the schema created by that migration.

Since the team shares one database, only one person should need to run migrations for the shared environment.

## API Overview

Base URL:

```text
/api
```

### Health Route

```text
GET    /api/hello
```

### Auth Routes

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Group Routes

```text
POST   /api/groups
POST   /api/groups/join
GET    /api/groups
GET    /api/groups/:id
PUT    /api/groups/:id
DELETE /api/groups/:id
```

### Member Routes

```text
GET    /api/groups/:groupId/members
DELETE /api/groups/:groupId/members/me
DELETE /api/groups/:groupId/members/:userId
```

### Event Routes

```text
POST   /api/events
GET    /api/events
GET    /api/events/:id
PUT    /api/events/:id
DELETE /api/events/:id
```

Event creation uses `group_id` in the request body to associate an event with a group.

### Idea Routes

```text
POST   /api/groups/:groupId/ideas
GET    /api/groups/:groupId/ideas
GET    /api/ideas/:ideaId
PUT    /api/ideas/:ideaId
DELETE /api/ideas/:ideaId
```

## API Notes

* Auth uses an HttpOnly cookie flow.
* Bearer token fallback is available for API testing and older clients.
* Protected routes require an authenticated user.
* Group-specific routes require group membership authorization where applied.
* API responses use a consistent success/error structure through the backend response helper.

Example success response:

```json
{
  "success": true,
  "data": {}
}
```

Example error response:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Team and Collaboration

### Team Members

* Andrey — Backend / Frontend
* David — Frontend
* Dj — Backend / Frontend
* Kaye — Frontend
* Olena — Backend / Frontend
* Uchenna — Backend

### Workflow

* Jira for task tracking
* Feature branches for development
* Pull requests required before merging
* Code reviews before merging to `main`
* Slack for team communication and coordination

## Development Process

* Jira was used to organize and track project tasks.
* Team members worked on feature branches and opened pull requests for review.
* Backend routes, validation, authentication, and authorization were built incrementally.
* Frontend service files were added to connect pages and components to backend routes.
* API documentation and backend testing examples were added in the backend docs folder.
* The team used code reviews to keep each other updated and maintain consistency.
* Near the final presentation, the team prioritized MVP stability, deployment, and demo readiness.

## Known Issues / Limitations

* Forgot password flow is not implemented yet.
* The logged-in user’s name is not currently displayed in the UI after login.
* Some dashboard data may still need more user-specific filtering.
* Mobile responsiveness can be improved.
* Automated test coverage can be expanded.

## Future Improvements

* Forgot password flow
* Display the logged-in user’s name in the dashboard/header
* Email invitations
* Mobile-friendly layout improvements
* Built-in group chat
* More user-specific dashboard filtering
* Expanded automated testing
* More detailed role/member permissions

## Acknowledgments

Thank you to our mentors, practicum director, Code the Dream team, and everyone who supported us during the practicum.

## License

This project is for educational purposes only.
