# Backend API Testing Examples

This document provides curl examples for testing core Gatherly backend API routes during development.

Base URL:

```bash
http://localhost:5000
```

## Notes

- Replace `<token>` with the JWT returned from the login response.
- Protected routes require this header:

```bash
Authorization: Bearer <token>
```

- Some current request examples include `created_by` because the current backend controllers require it in the request body.
- Ideas routes are not included yet because they are still in progress.

## Auth Routes

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected success response:

```bash
201 Created
```

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

Possible error response if the email is already registered:

```bash
409 Conflict
```

```json
{
  "msg": "Conflict: User already exists"
}
```

Possible validation error response:

```bash
400 Bad Request
```

```json
{
  "msg": "Bad Request: Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be a valid email address"
    }
  ]
}
```

### Log in

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected success response:

```bash
200 OK
```

```json
{
  "message": "Login successful",
  "token": "<token>",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

Save the returned token and use it for protected routes.

Possible error response for invalid credentials:

```bash
401 Unauthorized
```

```json
{
  "msg": "Unauthorized: Invalid credentials"
}
```

### Get current user

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

Possible error response if the token is missing:

```bash
401 Unauthorized
```

```json
{
  "msg": "Unauthorized: Authentication required"
}
```

Possible error response if the token is invalid or expired:

```bash
401 Unauthorized
```

```json
{
  "msg": "Unauthorized: Invalid or expired token"
}
```

## Group Routes

All group routes are protected and require a valid JWT.

Current implementation notes:

- `POST /api/groups` currently requires `name`, `invite_code`, and `created_by` in the request body because of the current validation middleware.
- The controller currently generates a new `invite_code`, so the returned `invite_code` may be different from the one sent in the request body.
- `PUT /api/groups/:id` currently updates the group `name`.

### Create a group

```bash
curl -X POST http://localhost:5000/api/groups \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Test Group",
    "invite_code": "TEST123",
    "created_by": 1
  }'
```

Expected success response:

```bash
201 Created
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Test Group",
    "invite_code": "ABC123",
    "created_by": 1,
    "created_at": "2026-05-23T00:00:00.000Z",
    "updated_at": "2026-05-23T00:00:00.000Z"
  }
}
```

Possible validation error response:

```bash
400 Bad Request
```

```json
{
  "message": "name, invite_code, and created_by are required"
}
```

### Get all groups

```bash
curl -X GET http://localhost:5000/api/groups \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Test Group",
      "invite_code": "ABC123",
      "created_by": 1,
      "created_at": "2026-05-23T00:00:00.000Z",
      "updated_at": "2026-05-23T00:00:00.000Z"
    }
  ]
}
```

### Get a group by ID

```bash
curl -X GET http://localhost:5000/api/groups/1 \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Test Group",
    "invite_code": "ABC123",
    "created_by": 1,
    "created_at": "2026-05-23T00:00:00.000Z",
    "updated_at": "2026-05-23T00:00:00.000Z"
  }
}
```

Possible error response if the authenticated user is not a member of the group:

```bash
403 Forbidden
```

```json
{
  "msg": "Forbidden: You are not a member of this group"
}
```

### Update a group

```bash
curl -X PUT http://localhost:5000/api/groups/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Updated Test Group"
  }'
```

Expected success response:

```bash
200 OK
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Test Group",
    "invite_code": "ABC123",
    "created_by": 1,
    "created_at": "2026-05-23T00:00:00.000Z",
    "updated_at": "2026-05-23T00:00:00.000Z"
  }
}
```

Possible validation error response:

```bash
400 Bad Request
```

```json
{
  "message": "Group name must be at least 3 characters long"
}
```

### Delete a group

```bash
curl -X DELETE http://localhost:5000/api/groups/1 \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "success": true,
  "data": {
    "message": "Group deleted successfully",
    "deleted": {
      "id": 1,
      "name": "Test Group",
      "invite_code": "ABC123",
      "created_by": 1,
      "created_at": "2026-05-23T00:00:00.000Z",
      "updated_at": "2026-05-23T00:00:00.000Z"
    }
  }
}
```

Possible error response if the group does not exist:

```bash
404 Not Found
```

```json
{
  "msg": "Not Found: Group not found"
}
```

## Event Routes

All event routes are protected and require a valid JWT.

Current implementation notes:

- `POST /api/events` currently requires `group_id`, `title`, `event_date`, `status`, and `created_by` in the request body.
- Valid event statuses are `planned`, `completed`, and `cancelled`.
- `GET /api/events` currently returns all events for an authenticated user.
- `GET /api/events/:id`, `PUT /api/events/:id`, and `DELETE /api/events/:id` check that the authenticated user belongs to the event's group.

### Create an event

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "group_id": 1,
    "title": "Test Event",
    "description": "Planning meeting for the group",
    "event_date": "2026-06-01T18:00:00.000Z",
    "status": "planned",
    "created_by": 1
  }'
```

Expected success response:

```bash
201 Created
```

```json
{
  "id": 1,
  "group_id": 1,
  "title": "Test Event",
  "description": "Planning meeting for the group",
  "event_date": "2026-06-01T18:00:00.000Z",
  "status": "planned",
  "created_by": 1,
  "created_at": "2026-05-23T00:00:00.000Z",
  "updated_at": "2026-05-23T00:00:00.000Z"
}
```

Possible validation error response:

```bash
400 Bad Request
```

```json
{
  "message": "group_id, title, event_date, status, and created_by are required"
}
```

Possible error response if the authenticated user is not a member of the group:

```bash
403 Forbidden
```

```json
{
  "msg": "Forbidden: You are not a member of this group"
}
```

### Get all events

```bash
curl -X GET http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
[
  {
    "id": 1,
    "group_id": 1,
    "title": "Test Event",
    "description": "Planning meeting for the group",
    "event_date": "2026-06-01T18:00:00.000Z",
    "status": "planned",
    "created_by": 1,
    "created_at": "2026-05-23T00:00:00.000Z",
    "updated_at": "2026-05-23T00:00:00.000Z"
  }
]
```

### Get an event by ID

```bash
curl -X GET http://localhost:5000/api/events/1 \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "id": 1,
  "group_id": 1,
  "title": "Test Event",
  "description": "Planning meeting for the group",
  "event_date": "2026-06-01T18:00:00.000Z",
  "status": "planned",
  "created_by": 1,
  "created_at": "2026-05-23T00:00:00.000Z",
  "updated_at": "2026-05-23T00:00:00.000Z"
}
```

Possible error response if the event does not exist:

```bash
404 Not Found
```

```json
{
  "msg": "Not Found: Event not found"
}
```

### Update an event

```bash
curl -X PUT http://localhost:5000/api/events/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Updated Test Event",
    "status": "completed"
  }'
```

Expected success response:

```bash
200 OK
```

```json
{
  "id": 1,
  "group_id": 1,
  "title": "Updated Test Event",
  "description": "Planning meeting for the group",
  "event_date": "2026-06-01T18:00:00.000Z",
  "status": "completed",
  "created_by": 1,
  "created_at": "2026-05-23T00:00:00.000Z",
  "updated_at": "2026-05-23T00:00:00.000Z"
}
```

Possible validation error response:

```bash
400 Bad Request
```

```json
{
  "message": "Invalid status. Allowed values: planned, completed, cancelled"
}
```

### Delete an event

```bash
curl -X DELETE http://localhost:5000/api/events/1 \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "message": "Event deleted successfully",
  "event": {
    "id": 1,
    "group_id": 1,
    "title": "Test Event",
    "description": "Planning meeting for the group",
    "event_date": "2026-06-01T18:00:00.000Z",
    "status": "planned",
    "created_by": 1,
    "created_at": "2026-05-23T00:00:00.000Z",
    "updated_at": "2026-05-23T00:00:00.000Z"
  }
}
```

## Member Routes

All member routes are protected and require a valid JWT.

Current implementation notes:

- Member routes are mounted under `/api/groups`.
- The authenticated user must be a member of the requested group.
- Removing another member is only allowed for the group creator.
- Group creators cannot leave their own group through `DELETE /api/groups/:groupId/members/me`.

### Get group members

```bash
curl -X GET http://localhost:5000/api/groups/1/members \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "members": [
    {
      "id": 1,
      "name": "Test User",
      "email": "test@example.com",
      "joined_at": "2026-05-23T00:00:00.000Z"
    }
  ]
}
```

Possible error response if the authenticated user is not a member of the group:

```bash
403 Forbidden
```

```json
{
  "msg": "Forbidden: You are not a member of this group"
}
```

Possible error response if no members are found:

```bash
404 Not Found
```

```json
{
  "msg": "Not Found: No members found for this group"
}
```

### Leave a group

```bash
curl -X DELETE http://localhost:5000/api/groups/1/members/me \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "message": "Successfully left the group"
}
```

Possible error response if the authenticated user is the group creator:

```bash
400 Bad Request
```

```json
{
  "msg": "Bad Request: Group creators cannot leave their own group. Please delete the group instead."
}
```

Possible error response if the group does not exist:

```bash
404 Not Found
```

```json
{
  "msg": "Not Found: Group not found"
}
```

### Remove a group member

```bash
curl -X DELETE http://localhost:5000/api/groups/1/members/2 \
  -H "Authorization: Bearer <token>"
```

Expected success response:

```bash
200 OK
```

```json
{
  "message": "Member successfully removed from the group"
}
```

Possible error response if the authenticated user is not the group creator:

```bash
400 Bad Request
```

```json
{
  "msg": "Bad Request: Only group creators can remove members"
}
```

Possible error response if the group creator tries to remove themselves:

```bash
400 Bad Request
```

```json
{
  "msg": "Bad Request: Group creators cannot remove themselves. Please leave the group instead."
}
```

Possible error response if the target user is not a member of the group:

```bash
404 Not Found
```

```json
{
  "msg": "Not Found: User 2 is not a member of group 1"
}
```
