# Gatherly

Gatherly is a full-stack planning app for couples, friends, and small groups who want one shared place to organize time together. Members can create or join a group, plan upcoming events, and keep a shared list of future activity ideas.

## 🚀 Live Demo

- **Frontend Live Site:** https://your-frontend-url.com
- **Frontend Repo:** /frontend
- **Backend Repo:** /backend

## 🧠 Problem Statement

This app is for couples, friends, and small groups who want to spend more time together but struggle with organizing plans and schedules. It addresses the frustration of having ideas, conversations, and schedules scattered across different apps, which often leads to missed details or forgotten plans. This solution matters because it creates a single, shared space that makes planning easier, more organized, and more likely to actually happen.

## 🎯 Features

- User registration and login
- Create a group
- Join a group with an invite code
- Shared group dashboard
- Create and view upcoming events
- Track event status as `planned`, `cancelled`, or `completed`
- View activity history through completed events
- Shared ideas list for future activities

## 📸 Screenshots

Add screenshots or GIFs of key features here.

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint

### Backend

- Node.js
- Express
- REST API

### Database

- PostgreSQL
- Neon-hosted development database

### Tooling

- Git & GitHub
- dotenv (environment variables)
- ESLint / Prettier

## 📁 Project Structure

```text
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB or PostgreSQL (local or cloud)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Backend runs on:  
http://localhost:8080

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
http://localhost:5173

## 🧪 Available Scripts

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

**Node.js requirement:** The migration tooling uses `node-pg-migrate`, which requires Node.js `>= 20.11.0`. Use Node.js 20.11.0 or later when running migration commands.
`npm run migrate:up` applies migrations and creates the database schema.

`npm run migrate:down` rolls back the latest migration. Since this project currently has one migration, running it will remove the schema created by that migration.

Since we are sharing one database, only one person would need to run migrations.

## 🔐 API Overview

### Example Endpoints

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/items
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
```

## 🤝 Team & Collaboration

### Team Members

- Andrey — Backend / Frontend
- David — Frontend
- Dj — Backend / Frontend
- Kaye — Frontend
- Olena — Backend / Frontend
- Uchenna — Backend

### Workflow

- GitHub Issues for task tracking
- Feature branches for development
- Pull Requests required for all merges
- Code reviews before merging to `main`

## 🧩 Development Process

- Agile / sprint-based workflow
- Backend API built before frontend integration
- MVP defined early
- Incremental feature development

## 📌 Known Issues / Limitations

- Limited role-based access control
- No automated tests yet
- Performance optimizations pending

## 🛣 Future Improvements

- Add automated testing (Jest, Supertest)
- Improve security and validation
- Add caching and performance improvements
- Dockerize the application

## 🙌 Acknowledgments

- Mentors
- Instructors
- Open-source libraries and tools

## 📄 License

This project is for educational purposes only.
