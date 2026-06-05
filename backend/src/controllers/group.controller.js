const { StatusCodes } = require('http-status-codes');
const db = require('../config/db.postgres');
const { BadRequestError, NotFoundError, ConflictError } = require('../errors');
const { sendSuccess } = require('../utils/response');

// Helpers
const parseId = (id) => {
  const parsed = Number.parseInt(id, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const clean = (value) => (value === undefined ? null : value);

// Generate random invite code
const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * CREATE GROUP
 */
const createGroup = async (req, res, next) => {
  let client;

  try {
    client = await db.connect();

    const { name } = req.body;
    const createdBy = req.user?.id;

    if (!name || createdBy == null) {
      throw new BadRequestError('name and authenticated user are required');
    }

    let invite_code;
    let exists = true;

    // Ensure unique invite code
    while (exists) {
      invite_code = generateInviteCode();

      const check = await db.query(
        'SELECT 1 FROM groups WHERE invite_code = $1',
        [invite_code],
      );

      exists = check.rows.length > 0;
    }

    const query = `
      INSERT INTO groups (name, invite_code, created_by, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;
    `;

    await client.query('BEGIN');

    const values = [name, invite_code, createdBy];

    const result = await client.query(query, values);
    const group = result.rows[0];

    await client.query(
      `
        INSERT INTO group_members (group_id, user_id)
        VALUES ($1, $2);
      `,
      [group.id, createdBy],
    );

    await client.query('COMMIT');

    return sendSuccess(res, group, StatusCodes.CREATED);

  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    /*return sendError(res, 'Error creating group', error);*/
    next(error);
  } finally {
    if (client) {
      client.release();
    }
  }
};

/**
 * JOIN GROUP BY INVITE CODE
 */
const joinGroupByInviteCode = async (req, res, next) => {
  let client;

  try {
    const { invite_code } = req.body;
    const userId = req.user?.id;

    if (!invite_code || userId == null) {
      throw new BadRequestError(
        'invite_code and authenticated user are required',
      );
    }

    const inviteCode = invite_code.trim().toUpperCase();

    client = await db.connect();

    await client.query('BEGIN');

    const groupResult = await client.query(
      `
        SELECT *
        FROM groups
        WHERE invite_code = $1;
      `,
      [inviteCode],
    );

    if (groupResult.rows.length === 0) {
      throw new NotFoundError('Group not found');
    }

    const group = groupResult.rows[0];

    const memberResult = await client.query(
      `
        SELECT id
        FROM group_members
        WHERE group_id = $1 AND user_id = $2;
      `,
      [group.id, userId],
    );

    if (memberResult.rows.length > 0) {
      throw new ConflictError('User is already a member of this group');
    }

    await client.query(
      `
        INSERT INTO group_members (group_id, user_id)
        VALUES ($1, $2);
      `,
      [group.id, userId],
    );

    await client.query('COMMIT');

    return sendSuccess(
      res,
      group,
      StatusCodes.CREATED,
      'Successfully joined group',
    );
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }

    next(error);
  } finally {
    if (client) {
      client.release();
    }
  }
};

/**
 * GET ALL GROUPS
 */
const getAllGroups = async (req, res, next) => {
  try {
    const query = `
      SELECT *
      FROM groups
      ORDER BY created_at DESC;
    `;

    const result = await db.query(query);

    return sendSuccess(res, result.rows);
  } catch (error) {
    /* return sendError(res, 'Error fetching groups', error);*/
    next(error);
  }
};

/**
 * GET GROUP BY ID
 */
const getGroupById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      throw new BadRequestError('Invalid group ID');
    }

    const result = await db.query('SELECT * FROM groups WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw new NotFoundError('Group not found');
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    /*return sendError(res, 'Error fetching group', error);*/
    next(error);
  }
};

/**
 * UPDATE GROUP
 */
const updateGroup = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      throw new BadRequestError('Invalid group ID');
    }

    const { name } = req.body;

    const query = `
      UPDATE groups
      SET
        name = COALESCE($1, name),
        updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;

    const values = [clean(name), id];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      throw new NotFoundError('Group not found');
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    /*return sendError(res, 'Error updating group', error);*/
    next(error);
  }
};

/**
 * DELETE GROUP
 */
const deleteGroup = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      throw new BadRequestError('Invalid group ID');
    }

    const result = await db.query(
      'DELETE FROM groups WHERE id = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Group not found');
    }

    return sendSuccess(
      res,
      { deleted: result.rows[0] },
      StatusCodes.OK,
      'Group deleted successfully',
    );
  } catch (error) {
    /*return sendError(res, 'Error deleting group', error);*/
    next(error);
  }
};

module.exports = {
  createGroup,
  joinGroupByInviteCode,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
