const CustomError = require('./CustomError');
const UnauthorizedError = require('./UnauthorizedError');
const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const InternalServerError = require('./internalServerError');
const ConflictError = require('./ConflictError');

module.exports = {
  CustomError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ConflictError,
};
