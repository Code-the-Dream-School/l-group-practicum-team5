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

const validateJoinGroup = (req, res, next) => {
  const { invite_code } = req.body;

  if (!invite_code) {
    return next(new BadRequestError('invite_code is required'));
  }

  if (
    typeof invite_code !== 'string' ||
    invite_code.trim().length < 4 ||
    invite_code.trim().length > 20
  ) {
    return next(
      new BadRequestError('Invite code must be between 4 and 20 characters'),
    );
  }

  next();
};

module.exports = {
  validateCreateGroup,
  validateUpdateGroup,
  validateJoinGroup,
};
