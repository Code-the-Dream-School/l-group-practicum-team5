const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
  constructor(message, details = null) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = `${ReasonPhrases.BAD_REQUEST}: ${message}`;
    this.details = details;
  }
}

module.exports = BadRequestError;
