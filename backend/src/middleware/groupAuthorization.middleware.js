const db = require('../config/db.postgres');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const parseId = (id) => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const checkGroupExists = async (groupId) => {
  const groupResult = await db.query('SELECT id FROM groups WHERE id = $1', [
    groupId,
  ]);

  return groupResult.rows.length > 0;
};

const checkGroupMembership = async (groupId, userId) => {
  const memberResult = await db.query(
    `
      SELECT id
      FROM group_members
      WHERE group_id = $1 AND user_id = $2;
    `,
    [groupId, userId],
  );

  return memberResult.rows.length > 0;
};

const verifyGroupMembership = async (groupId, userId) => {
  const groupExists = await checkGroupExists(groupId);

  if (!groupExists) {
    throw new NotFoundError('Group not found');
  }

  const isMember = await checkGroupMembership(groupId, userId);

  if (!isMember) {
    throw new ForbiddenError('You are not a member of this group');
  }
};

const authorizeGroupMember = (groupIdParam = 'groupId') => {
  return async (req, res, next) => {
    try {
      const groupId = parseId(req.params[groupIdParam]);
      const userId = parseId(req.user?.id);

      if (!groupId) {
        throw new BadRequestError('Invalid group ID');
      }

      if (!userId) {
        throw new BadRequestError('Invalid user ID');
      }

      await verifyGroupMembership(groupId, userId);

      next();
    } catch (error) {
      next(error);
    }
  };
};

const authorizeGroupMemberFromBody = (
  groupIdField = 'group_id',
  required = true,
) => {
  return async (req, res, next) => {
    try {
      if (!required && req.body[groupIdField] === undefined) {
        return next();
      }

      const groupId = parseId(req.body[groupIdField]);
      const userId = parseId(req.user?.id);

      if (!groupId) {
        throw new BadRequestError('Invalid group ID');
      }

      if (!userId) {
        throw new BadRequestError('Invalid user ID');
      }

      await verifyGroupMembership(groupId, userId);

      next();
    } catch (error) {
      next(error);
    }
  };
};

const authorizeEventGroupMember = async (req, res, next) => {
  try {
    const eventId = parseId(req.params.id);
    const userId = parseId(req.user?.id);

    if (!eventId) {
      throw new BadRequestError('Invalid event ID');
    }

    if (!userId) {
      throw new BadRequestError('Invalid user ID');
    }

    const eventResult = await db.query(
      `
        SELECT id, group_id
        FROM events
        WHERE id = $1;
      `,
      [eventId],
    );

    if (eventResult.rows.length === 0) {
      throw new NotFoundError('Event not found');
    }

    const groupId = eventResult.rows[0].group_id;

    await verifyGroupMembership(groupId, userId);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeGroupMember,
  authorizeGroupMemberFromBody,
  authorizeEventGroupMember,
};
