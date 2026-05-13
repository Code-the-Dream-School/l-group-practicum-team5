const db = require('../config/db.postgres');
const { BadRequestError, NotFoundError } = require('../errors');

// Helpers
const parseId = (id) => {
  const parsed = Number.parseInt(id, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const clean = (value) => (value === undefined ? null : value);

const sendSuccess = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

/*const sendError = (res, message, error = null, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    error: error ? error.message : undefined,
  });
};*/

// Generate random invite code
const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * CREATE GROUP
 */
const createGroup = async (req, res, next) => {
  try {
    const { name, created_by } = req.body;

    if (!name || created_by == null) {
      throw new BadRequestError('name and created_by are required');
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

    const values = [name, invite_code, created_by];

    const result = await db.query(query, values);

    return sendSuccess(res, result.rows[0], 201);
  } catch (error) {
    /*return sendError(res, 'Error creating group', error);*/
    next(error);
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

    return sendSuccess(res, {
      message: 'Group deleted successfully',
      deleted: result.rows[0],
    });
  } catch (error) {
    /*return sendError(res, 'Error deleting group', error);*/
    next(error);
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
