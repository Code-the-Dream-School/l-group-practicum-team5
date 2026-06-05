const { BadRequestError } = require('../errors');

const validateCreateGroup = (req, res, next) => {
  const { name } = req.body;

  // Required fields
  if (!name) {
    return next(new BadRequestError('name is required'));
  }

  // Name validation
  if (typeof name !== 'string' || name.trim().length < 3) {
    return next(
      new BadRequestError('Group name must be at least 3 characters long'),
    );
  }

  next();
};

const validateUpdateGroup = (req, res, next) => {
  const { name } = req.body;

  if (name && name.trim().length < 3) {
    return next(
      new BadRequestError('Group name must be at least 3 characters long'),
    );
  }

  next();
};

module.exports = {
  validateCreateGroup,
  validateUpdateGroup,
};
