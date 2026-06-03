const { BadRequestError } = require('../errors');

const isPositiveInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

const validateIdeaIdParam = (req, res, next) => {
  const { ideaId } = req.params;

  if (!isPositiveInteger(ideaId)) {
    return next(new BadRequestError('Invalid idea ID'));
  }

  next();
};

const validateCreateIdea = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return next(new BadRequestError('Title and description are required'));
  }

  if (typeof title !== 'string' || title.trim().length < 3) {
    return next(
      new BadRequestError('Title must be at least 3 characters long'),
    );
  }

  if (typeof description !== 'string' || description.trim().length === 0) {
    return next(new BadRequestError('Description is required'));
  }

  next();
};

const validateUpdateIdea = (req, res, next) => {
  const { title, description } = req.body;

  if (title === undefined && description === undefined) {
    return next(
      new BadRequestError('At least one of title or description is required'),
    );
  }

  if (
    title !== undefined &&
    (typeof title !== 'string' || title.trim().length < 3)
  ) {
    return next(
      new BadRequestError('Title must be at least 3 characters long'),
    );
  }

  if (
    description !== undefined &&
    (typeof description !== 'string' || description.trim().length === 0)
  ) {
    return next(new BadRequestError('Description cannot be empty'));
  }

  next();
};

module.exports = {
  validateIdeaIdParam,
  validateCreateIdea,
  validateUpdateIdea,
};
