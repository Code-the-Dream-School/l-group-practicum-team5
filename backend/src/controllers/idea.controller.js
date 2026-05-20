const db = require('../config/db.postgres');
const { BadRequestError, NotFoundError } = require('../errors');

const createIdea = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { groupId } = req.params;
    const userId = parseInt(req.user.id);

    if (!title || !description) {
      throw new BadRequestError('Title and description are required');
    }

    if (!groupId) {
      throw new BadRequestError('Group ID is required');
    }

    const groupCheckQuery = await db.query(
      `
      SELECT id
      FROM groups
      WHERE id = $1;
      `,
      [groupId],
    );

    if (groupCheckQuery.rows.length === 0) {
      throw new NotFoundError(`Group ${groupId} not found`);
    }
    
    const createIdeatQuery = `
      INSERT INTO ideas (title, description, group_id, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, description, group_id, created_by, created_at;
    `;
  } catch (error) {
    next(error);
  }
};

const getGroupIdeas = async (req, res, next) => {
    try {
    const { groupId } = req.params;
    } catch (error) {
    next(error);
  }
};

const getIdeaById = async (req, res, next) => {
  res.send('Get idea by ID');
};

const updateIdea = async (req, res, next) => {
  try {
    const { ideaId } = req.params;
    const { title, description } = req.body;
    const userId = parseInt(req.user.id);

    if (!ideaId) {
      throw new BadRequestError('Idea ID is required');
    }

    if (!title && !description) {
      throw new BadRequestError('At least one of title or description is required');
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

    if (ideaCheckQuery.rows[0].created_by !== userId) {
      throw new BadRequestError('You are not the owner of this idea');
    }
    
    const updatequery = `
      UPDATE ideas
      SET title = $1,

        description = $2,  
        updated_at = NOW()
        WHERE id = $3
        RETURNING id, title, description, group_id, created_by, created_at, updated_at;
        `;

        const result = await db.query(updatequery, [title, description, ideaId]);

        if (result.rows.length === 0) {
          throw new NotFoundError(`Idea ${ideaId} not found`);
        }

        res.status(200).json({ idea: result.rows[0] });
  } catch (error) {
    next(error);
  } 
};

const deleteIdea = async (req, res, next) => {
  try{
    const { ideaId } = req.params;
    const userId = parseInt(req.user.id);

    if (!ideaId) {
      throw new BadRequestError('Idea ID is required');
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

    if (ideaCheckQuery.rows[0].created_by !== userId) {
      throw new BadRequestError('You are not the owner of this idea');
    }

    const deleteQuery = `
      DELETE FROM ideas
      WHERE id = $1
      RETURNING id;
    `;

    const result = await db.query(deleteQuery, [ideaId]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Idea ${ideaId} not found`);
    }

    res.status(200).json({ message: 'Idea deleted successfully' });
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
