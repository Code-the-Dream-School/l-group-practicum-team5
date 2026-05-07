# Gatherly API Routes (MVP)

This document defines the planned API route structure for the Gatherly App MVP.

## 📌 Base URL

```txt
/api

## 🔐 Authentication Routes

These routes are **public** and do not require authentication.

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Log in a user and return a JWT |

---

## 👥 Group Routes

These routes **require authentication**.

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/groups | Create a new group |
| POST   | /api/groups/join | Join a group using an invite code |
| GET    | /api/groups/:groupId | Get group details |

---

## 📅 Event Routes

These routes **require authentication**.

| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | /api/groups/:groupId/events | Get all events for a group |
| POST   | /api/groups/:groupId/events | Create a new event |

---

## 💡 Idea Routes

These routes **require authentication**.

| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | /api/groups/:groupId/ideas | Get all ideas for a group |
| POST   | /api/groups/:groupId/ideas | Create a new idea |

---

## 🔒 Authentication Notes

- All routes (except `/api/auth/register` and `/api/auth/login`) require authentication.
- Protected routes must include a JWT in the request header:
`Authorization: Bearer <token>`
---

## ⚠️ MVP Scope Notes

- This is **planning only** (no full implementation yet)
- No password reset
- No email verification
- No refresh tokens
- API kept intentionally simple for MVP

---

## 🧠 Future Improvements

- Add PUT/PATCH routes (update resources)
- Add DELETE routes
- Add role-based permissions
- Add refresh token flow
- Add validation schemas

---

## 📌 Summary

This document defines the initial API structure for the Gatherly backend and will evolve as features are implemented.
```
