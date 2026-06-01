const { validationResult } = require('express-validator');
const BadRequestError = require('../errors/BadRequestError');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return next(new BadRequestError('Validation failed', formattedErrors));
  }

  next();
};

module.exports = validateRequest;
