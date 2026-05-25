const CustomError = require('./CustomError');
const UnauthorizedError = require('./UnauthorizedError');
const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const InternalServerError = require('./internalServerError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  CustomError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ConflictError,
  ForbiddenError,
};
