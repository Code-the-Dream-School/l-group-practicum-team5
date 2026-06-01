const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');
const { sendError } = require('../utils/response');

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    return sendError(res, err.message, statusCode, err.details);
  }

  console.error(err);

  return sendError(
    res,
    'Something went wrong, try again later',
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
};

module.exports = errorHandlerMiddleware;
