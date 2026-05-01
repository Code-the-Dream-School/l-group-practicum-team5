# PostgreSQL Query Guidelines

This guide explains the basic PostgreSQL commands we will use most often in the backend.

The backend uses the `pg` npm package. Its `Pool` object manages database connections for us. We will usually wrap the pool in a small helper similar to this:

```js
import "./env.js";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text, params = []) => {
  return pool.query(text, params);
};
```

In backend code, SQL should usually get passed to that helper like this:

```js
const result = await query(
  `
  SELECT id, name, email
  FROM users
  WHERE id = $1
  `,
  [userId],
);
```

`$1` is a placeholder. PostgreSQL safely replaces it with the first value in the array, which is `userId` in this example. If there are more values, use `$2`, `$3`, and so on.

Never put user input directly inside the SQL string.

Bad:

```js
`SELECT id, name FROM users WHERE email = '${email}'`;
```

Good:

```js
const result = await query(
  `
  SELECT id, name
  FROM users
  WHERE email = $1
  `,
  [email],
);
```

## Reading Rows With SELECT

Use `SELECT` when you want to get data from a table.

Template:

```sql
SELECT column_one, column_two, column_three
FROM table_name;
```

Users example:

```sql
SELECT id, name, email, created_at, updated_at
FROM users
ORDER BY created_at DESC;
```

Prefer naming the columns you need instead of using `SELECT *`. This avoids accidentally returning sensitive fields like `password_hash`.

## Reading One Row

Use `WHERE` to filter rows. To get a specific row, you would usually filter by an `id`.

Template:

```sql
SELECT column_one, column_two, column_three
FROM table_name
WHERE id = $1;
```

Users example:

```sql
SELECT id, name, email, created_at, updated_at
FROM users
WHERE id = $1;
```

For group-owned data, include the group id too:

```sql
SELECT id, group_id, title, description, created_by, created_at
FROM ideas
WHERE group_id = $1 AND id = $2;
```

## Reading a List

Lists should usually include `ORDER BY` so the result order is predictable.

Template:

```sql
SELECT id, column_one, column_two, created_at
FROM table_name
ORDER BY created_at DESC;
```

For lists that can grow, add `LIMIT` and `OFFSET`.

Users example:

```sql
SELECT id, name, email, created_at, updated_at
FROM users
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;
```

`LIMIT` controls how many rows come back. `OFFSET` controls how many rows to skip.

## Creating Rows With INSERT

Use `INSERT INTO` when adding a new row.

Template:

```sql
INSERT INTO table_name (column_one, column_two, column_three)
VALUES ($1, $2, $3)
RETURNING id, column_one, column_two, created_at;
```

Users example:

```sql
INSERT INTO users (name, email, password_hash)
VALUES ($1, $2, $3)
RETURNING id, name, email, created_at, updated_at;
```

`RETURNING` tells PostgreSQL which columns to send back after the insert succeeds.

Gatherly idea example:

```sql
INSERT INTO ideas (group_id, title, description, created_by)
VALUES ($1, $2, $3, $4)
RETURNING id, group_id, title, description, created_by, created_at, updated_at;
```

## Updating Rows With UPDATE

Use `UPDATE` when changing an existing row.

Template:

```sql
UPDATE table_name
SET column_one = $1,
    column_two = $2
WHERE id = $3
RETURNING id, column_one, column_two, updated_at;
```

Users example:

```sql
UPDATE users
SET name = $1,
    email = $2
WHERE id = $3
RETURNING id, name, email, created_at, updated_at;
```

The `WHERE` clause is extremely important. Without it, PostgreSQL may update every row in the table.

Gatherly event example:

```sql
UPDATE events
SET title = $1,
    description = $2,
    event_date = $3,
    status = $4
WHERE group_id = $5 AND id = $6
RETURNING id, group_id, title, description, event_date, status, created_by, updated_at;
```

For partial updates, build the `SET` list in JavaScript from a fixed list of allowed column names. Values should still use `$1`, `$2`, etc.

## Deleting Rows With DELETE

Use `DELETE FROM` when removing a row.

Template:

```sql
DELETE FROM table_name
WHERE id = $1
RETURNING id, column_one, column_two;
```

Users example:

```sql
DELETE FROM users
WHERE id = $1
RETURNING id, name, email;
```

The `WHERE` clause is also required here. Without it, PostgreSQL may delete every row in the table.

`RETURNING` is useful because it lets the API confirm which row was deleted.

## Joining Tables

Use `JOIN` when data lives in more than one table.

Template:

```sql
SELECT t1.id, t1.column_one, t2.column_two
FROM table_one t1
JOIN table_two t2 ON t2.table_one_id = t1.id
WHERE t1.id = $1;
```

Users example:

This gets users who belong to a group:

```sql
SELECT u.id, u.name, u.email, gm.joined_at
FROM users u
JOIN group_members gm ON gm.user_id = u.id
WHERE gm.group_id = $1
ORDER BY u.name ASC;
```

Gatherly group example:

```sql
SELECT g.id, g.name, g.invite_code, g.created_by, g.created_at
FROM groups g
JOIN group_members gm ON gm.group_id = g.id
WHERE gm.user_id = $1
ORDER BY g.name ASC;
```

`groups g` gives the `groups` table a short alias named `g`. `group_members gm` gives `group_members` a short alias named `gm`. Aliases make joins easier to read.

## Checking Group Membership

Before reading or changing group data, make sure the current user belongs to that group.

```sql
SELECT g.id, g.name, g.invite_code, g.created_by, g.created_at
FROM groups g
JOIN group_members gm ON gm.group_id = g.id
WHERE g.id = $1 AND gm.user_id = $2;
```

If this query returns no rows, the user should not be allowed to access that group.

## Transactions

Most CRUD queries can use the normal `query(...)` helper. That is enough for the main patterns in this guide.

A transaction is only needed when multiple database changes must succeed together. For example, if one request creates a group and also adds the creator to `group_members`, both inserts should succeed or both should fail.

The transaction keywords are:

```sql
BEGIN;
COMMIT;
ROLLBACK;
```

`BEGIN` starts the transaction. `COMMIT` saves the changes. `ROLLBACK` cancels the changes if something fails.

## Common PostgreSQL Errors

These error codes can help the backend decide what response to send.

| Code    | Meaning                                   |
| ------- | ----------------------------------------- |
| `23505` | Unique constraint violation               |
| `23503` | Foreign key violation                     |
| `23502` | Not-null violation                        |
| `23514` | Check constraint violation                |
| `22P02` | Invalid input syntax, often a bad id type |

## Quick Checklist

- Did the query use `$1`, `$2`, etc. for values?
- Did the query avoid returning `password_hash`?
- Did `UPDATE` or `DELETE` include a safe `WHERE` clause?
- Did group data check `group_id` or membership?
- Does a list query need `ORDER BY`, `LIMIT`, or `OFFSET`?
- Does a multi-step change need a transaction?
