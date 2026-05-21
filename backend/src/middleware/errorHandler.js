const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const response = { msg: err.message };

    if (err.details) {
      response.errors = err.details;
    }

    return res.status(statusCode).json(response);
  }

  console.error(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something went wrong, try again later' });
};

module.exports = errorHandlerMiddleware;
