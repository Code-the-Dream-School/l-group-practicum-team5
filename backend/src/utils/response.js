const { StatusCodes } = require('http-status-codes');

const sendSuccess = (
  res,
  data = null,
  statusCode = StatusCodes.OK,
  message = null,
) => {
  const response = {
    success: true,
  };

  if (message) {
    response.message = message;
  }

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const sendError = (
  res,
  message,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  errors = null,
) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};
