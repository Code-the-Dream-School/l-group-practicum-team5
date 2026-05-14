const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.message = `${ReasonPhrases.NOT_FOUND}: ${message}`;
  }
}

module.exports = NotFoundError;
