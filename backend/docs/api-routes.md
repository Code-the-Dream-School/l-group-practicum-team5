# Gatherly API Routes (MVP)

This document describes the current backend API route structure for the Gatherly App MVP.

## 📌 Base URL

```txt
/api
```

---

## 🔐 Authentication Routes

### Public Authentication Routes

These routes are public and do not require authentication.

| Method | Endpoint           | Description                                   |
| ------ | ------------------ | --------------------------------------------- |
| POST   | /api/auth/register | Register a new user                           |
| POST   | /api/auth/login    | Log in a user and set an HttpOnly auth cookie |
| POST   | /api/auth/logout   | Clear the auth cookie                         |

### Protected Authentication Routes

These routes require authentication.

| Method | Endpoint     | Description                          |
| ------ | ------------ | ------------------------------------ |
| GET    | /api/auth/me | Get the currently authenticated user |

#### GET /api/auth/me

Returns the authenticated user's safe profile information.

This route accepts a valid authentication cookie from `POST /api/auth/login`, with Bearer token fallback for API testing and older clients.
Frontend requests must include credentials so the browser sends the cookie:

```txt
fetch(url, { credentials: 'include' })
```

Frontend code should use the cookie flow and should not store the JWT in JavaScript.

Expected response example:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Example User",
      "email": "user@example.com"
    }
  }
}
```

---

## 👥 Group Routes

These routes require authentication.

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | /api/groups          | Create a new group                |
| POST   | /api/groups/join     | Join a group using an invite code |
| GET    | /api/groups/:groupId | Get group details                 |

Group-specific routes also require the authenticated user to be a member of the requested group where group membership authorization is applied.

---

## 👤 Member Routes

These routes require authentication and group membership authorization.

| Method | Endpoint                             | Description                             |
| ------ | ------------------------------------ | --------------------------------------- |
| GET    | /api/groups/:groupId/members         | Get all members for a group             |
| DELETE | /api/groups/:groupId/members/me      | Leave a group as the authenticated user |
| DELETE | /api/groups/:groupId/members/:userId | Remove a member from a group            |

### Member Route Notes

- `GET /api/groups/:groupId/members` returns group members with safe user details.
- `DELETE /api/groups/:groupId/members/me` allows the authenticated user to leave a group.
- Group creators cannot leave their own group using the leave route.
- `DELETE /api/groups/:groupId/members/:userId` allows a group creator to remove another member.
- Group creators cannot remove themselves using the remove member route.

---

## 📅 Event Routes

These routes require authentication.

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | /api/groups/:groupId/events | Get all events for a group |
| POST   | /api/groups/:groupId/events | Create a new event         |

Group event routes require the authenticated user to be a member of the requested group where group membership authorization is applied.

---

## 💡 Idea Routes

These routes are planned for the MVP, but idea route implementation is still in progress.

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | /api/groups/:groupId/ideas | Get all ideas for a group |
| POST   | /api/groups/:groupId/ideas | Create a new idea         |

---

## 🔒 Authentication Notes

- Public routes:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Protected routes require a valid authentication cookie set by `POST /api/auth/login`, with Bearer token fallback for API testing and older clients.
- Frontend requests should use credentialed requests so the browser sends the cookie automatically.
- API testing tools can also send cookies from a cookie jar.

```txt
Cookie: gatherly_auth=<jwt>
```

- Protected group-specific routes may also require group membership authorization.
- API responses should not include password hashes or other sensitive user fields.

---

## ⚠️ MVP Scope Notes

- No password reset
- No email verification
- No refresh tokens
- API kept intentionally simple for MVP
- Some routes are implemented, while others are still planned or in progress

---

## 🧠 Future Improvements

- Add PUT/PATCH routes for updating resources
- Add DELETE routes where needed
- Add role-based permissions
- Add refresh token flow
- Add validation schemas
- Expand API examples for testing and frontend integration

---

## 📌 Summary

This document tracks the Gatherly backend API route structure and should be updated as routes are implemented or changed.
