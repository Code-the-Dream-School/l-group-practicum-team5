# Gatherly API Routes

This document describes the current backend API route structure for the Gatherly app.

## Base URL

```txt
/api
```

## Health Check Route

| Method | Endpoint   | Description                           |
| ------ | ---------- | ------------------------------------- |
| GET    | /api/hello | Check that the backend API is running |

## Authentication Routes

### Public Authentication Routes

These routes do not require authentication.

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

### Authentication Notes

* Auth uses an HttpOnly cookie flow.
* Bearer token fallback is available for API testing and older clients.
* Frontend requests should use credentialed requests so the browser sends the cookie automatically.

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

## Group Routes

These routes require authentication.

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| POST   | /api/groups      | Create a new group                |
| POST   | /api/groups/join | Join a group using an invite code |
| GET    | /api/groups      | Get all groups                    |
| GET    | /api/groups/:id  | Get group details                 |
| PUT    | /api/groups/:id  | Update group details              |
| DELETE | /api/groups/:id  | Delete a group                    |

### Group Route Notes

* Group routes are mounted under `/api/groups`.
* Group-specific routes require the authenticated user to be a member of the requested group where group membership authorization is applied.
* Creating a group also adds the authenticated user as a group member.

## Member Routes

These routes require authentication and group membership authorization.

| Method | Endpoint                             | Description                             |
| ------ | ------------------------------------ | --------------------------------------- |
| GET    | /api/groups/:groupId/members         | Get all members for a group             |
| DELETE | /api/groups/:groupId/members/me      | Leave a group as the authenticated user |
| DELETE | /api/groups/:groupId/members/:userId | Remove a member from a group            |

### Member Route Notes

* `GET /api/groups/:groupId/members` returns group members with safe user details.
* `DELETE /api/groups/:groupId/members/me` allows the authenticated user to leave a group.
* `DELETE /api/groups/:groupId/members/:userId` allows a member removal flow.
* Group membership authorization is applied before returning or modifying group member data.

## Event Routes

These routes require authentication.

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | /api/events     | Create a new event |
| GET    | /api/events     | Get all events     |
| GET    | /api/events/:id | Get event details  |
| PUT    | /api/events/:id | Update an event    |
| DELETE | /api/events/:id | Delete an event    |

### Event Route Notes

* Event routes are mounted under `/api/events`.
* Event creation uses `group_id` in the request body to associate an event with a group.
* Event status must be one of: `planned`, `completed`, or `cancelled`.
* Group membership authorization is applied where event access depends on the event’s group.

## Idea Routes

Idea routes are split between group-based idea routes and individual idea routes.

### Group Idea Routes

These routes require authentication and group membership authorization.

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| POST   | /api/groups/:groupId/ideas | Create an idea for a group |
| GET    | /api/groups/:groupId/ideas | Get all ideas for a group  |

### Individual Idea Routes

These routes require authentication and idea group membership authorization.

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /api/ideas/:ideaId | Get idea details |
| PUT    | /api/ideas/:ideaId | Update an idea   |
| DELETE | /api/ideas/:ideaId | Delete an idea   |

## API Response Format

Success response example:

```json
{
  "success": true,
  "data": {}
}
```

Success response with message example:

```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": {}
}
```

Error response example:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Security Notes

* Public routes are limited to registration, login, logout, and health check.
* Protected routes require a valid authentication cookie or Bearer token fallback.
* Password hashes and sensitive fields should never be returned in API responses.
* Group-specific data is protected with group membership authorization where applied.
* Validation middleware is used to reject invalid request data before controller logic runs.

## MVP Scope Notes

* No forgot password flow yet.
* No email verification yet.
* No refresh token flow yet.
* Some dashboard/user-specific filtering may still need improvement.
* API is intentionally kept simple for the MVP.

## Future Improvements

* Forgot password flow
* Email verification
* Refresh token flow
* Expanded automated testing
* More detailed role/member permissions
* More user-specific dashboard filtering
* Additional API examples for frontend integration and testing

## Summary

This document tracks the current Gatherly backend API route structure and should be updated when routes are added, removed, or changed.
