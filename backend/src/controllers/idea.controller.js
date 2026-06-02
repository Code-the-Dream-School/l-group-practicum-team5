const db = require('../config/db.postgres');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const createIdea = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { groupId } = req.params;
    const userId = parseInt(req.user.id);

    if (!title || !description) {
      throw new BadRequestError('Title and description are required');
    }

    const createIdeaQuery = `
      INSERT INTO ideas (title, description, group_id, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, description, group_id, created_by, created_at;
    `;

    const result = await db.query(createIdeaQuery, [
      title,
      description,
      groupId,
      userId,
    ]);

    res.status(StatusCodes.CREATED).json({ idea: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const getGroupIdeas = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = parseInt(req.user.id);

    const query = `
      SELECT id, title, description, group_id, created_by, created_at, updated_at
      FROM ideas
      WHERE group_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await db.query(query, [groupId]);

    res.status(StatusCodes.OK).json({ ideas: result.rows });
  } catch (error) {
    next(error);
  }
};

const getIdeaById = async (req, res, next) => {
  try {
    const { ideaId } = req.params;
    const userId = parseInt(req.user.id);

    const parsed = Number(ideaId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new BadRequestError('Invalid idea ID');
    }

    const query = `
      SELECT id, title, description, group_id, created_by, created_at, updated_at
      FROM ideas
      WHERE id = $1;
    `;

    const result = await db.query(query, [ideaId]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Idea ${ideaId} not found`);
    }

    const idea = result.rows[0];

    res.status(StatusCodes.OK).json({ idea });
  } catch (error) {
    next(error);
  }
};

const updateIdea = async (req, res, next) => {
  try {
    const { ideaId } = req.params;
    const { title, description } = req.body;
    const userId = parseInt(req.user.id);

    const parsed = Number(ideaId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new BadRequestError('Invalid idea ID');
    }

    if (!title && !description) {
      throw new BadRequestError(
        'At least one of title or description is required',
      );
    }

    const ideaCheckQuery = await db.query(
      `
      SELECT created_by
      FROM ideas
      WHERE id = $1;
      `,
      [ideaId],
    );

    if (ideaCheckQuery.rows.length === 0) {
      throw new NotFoundError(`Idea ${ideaId} not found`);
    }

    if (parseInt(ideaCheckQuery.rows[0].created_by) !== userId) {
      throw new ForbiddenError('You are not the owner of this idea');
    }

    const updatequery = `
      UPDATE ideas
      SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        updated_at = NOW()
        WHERE id = $3
        RETURNING id, title, description, group_id, created_by, created_at, updated_at;
        `;

    const result = await db.query(updatequery, [
      title || null,
      description || null,
      ideaId,
    ]);

    res.status(StatusCodes.OK).json({ idea: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const deleteIdea = async (req, res, next) => {
  try {
    const { ideaId } = req.params;
    const userId = parseInt(req.user.id);

    const parsed = Number(ideaId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new BadRequestError('Invalid idea ID');
    }

    const ideaCheckQuery = await db.query(
      `
      SELECT created_by
      FROM ideas
      WHERE id = $1;
      `,
      [ideaId],
    );

    if (ideaCheckQuery.rows.length === 0) {
      throw new NotFoundError(`Idea ${ideaId} not found`);
    }

    if (parseInt(ideaCheckQuery.rows[0].created_by) !== userId) {
      throw new ForbiddenError('You are not the owner of this idea');
    }

    const deleteQuery = `
      DELETE FROM ideas
      WHERE id = $1
      RETURNING id;
    `;

    await db.query(deleteQuery, [ideaId]);

    res.status(StatusCodes.OK).json({ message: 'Idea deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIdea,
  getGroupIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
};
