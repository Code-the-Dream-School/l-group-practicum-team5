const { StatusCodes } = require('http-status-codes');
const db = require('../config/db.postgres');
const { BadRequestError, NotFoundError } = require('../errors');
const { sendSuccess } = require('../utils/response');

const getGroupMembers = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      throw new BadRequestError('Group ID is required');
    }
    const query = `
        SELECT u.id, u.name, u.email, gm.joined_at
        FROM group_members gm
        JOIN users u ON gm.user_id = u.id
        WHERE gm.group_id = $1
        ORDER BY gm.joined_at DESC;
        `;

    const result = await db.query(query, [groupId]);

    if (result.rows.length === 0) {
      throw new NotFoundError('No members found for this group');
    }

    return sendSuccess(res, { members: result.rows });
  } catch (error) {
    next(error);
  }
};

const leaveGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = parseInt(req.user.id);

    if (!groupId || !userId) {
      throw new BadRequestError('Group ID and User ID are required');
    }

    const groupcheckQuery = await db.query(
      `
    SELECT created_by
    FROM groups
    WHERE id = $1;
    `,
      [groupId],
    );

    if (groupcheckQuery.rows.length === 0) {
      throw new NotFoundError(`Group ${groupId} not found`);
    }

    if (parseInt(groupcheckQuery.rows[0].created_by) === userId) {
      throw new BadRequestError(
        'Group creators cannot leave their own group. Please delete the group instead.',
      );
    }

    const membercheckQuery = await db.query(
      `
        SELECT id
        FROM group_members
        WHERE group_id = $1 AND user_id = $2
        `,
      [groupId, userId],
    );

    if (membercheckQuery.rows.length === 0) {
      throw new NotFoundError(
        `User ${userId} is not a member of group ${groupId}`,
      );
    }

    await db.query(
      `
        DELETE FROM group_members
        WHERE group_id = $1 AND user_id = $2`,
      [groupId, userId],
    );

    return sendSuccess(
      res,
      null,
      StatusCodes.OK,
      'Successfully left the group',
    );
  } catch (error) {
    next(error);
  }
};

const removeGroupMember = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    const requesterId = parseInt(req.user.id);

    if (!groupId || !userId) {
      throw new BadRequestError('Group ID and User ID are required');
    }

    const groupCheck = await db.query(
      `
        SELECT created_by
        FROM groups
        WHERE id = $1;
        `,
      [groupId],
    );

    if (groupCheck.rows.length === 0) {
      throw new NotFoundError(`Group ${groupId} not found`);
    }

    if (parseInt(groupCheck.rows[0].created_by) !== requesterId) {
      throw new BadRequestError('Only group creators can remove members');
    }

    if (parseInt(userId) === requesterId) {
      throw new BadRequestError(
        'Group creators cannot remove themselves. Please leave the group instead.',
      );
    }

    const memberCheck = await db.query(
      `
        SELECT id
        FROM group_members
        WHERE group_id = $1 AND user_id = $2
        `,
      [groupId, userId],
    );

    if (memberCheck.rows.length === 0) {
      throw new NotFoundError(
        `User ${userId} is not a member of group ${groupId}`,
      );
    }

    await db.query(
      `
        DELETE FROM group_members
        WHERE group_id = $1 AND user_id = $2`,
      [groupId, userId],
    );

    return sendSuccess(
      res,
      null,
      StatusCodes.OK,
      'Member successfully removed from the group',
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGroupMembers,
  leaveGroup,
  removeGroupMember,
};
