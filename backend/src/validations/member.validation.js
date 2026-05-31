const { BadRequestError } = require('../errors');

const isPositiveInteger = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0;
};

const validateGroupIdParam = (req, res, next) => {
  const { groupId } = req.params;

  if (!isPositiveInteger(groupId)) {
    return next(new BadRequestError('Invalid group ID'));
  }

  next();
};

const validateUserIdParam = (req, res, next) => {
  const { userId } = req.params;

  if (!isPositiveInteger(userId)) {
    return next(new BadRequestError('Invalid user ID'));
  }

  next();
};

module.exports = {
  validateGroupIdParam,
  validateUserIdParam,
};
