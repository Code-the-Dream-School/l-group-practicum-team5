const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const CustomError = require('./CustomError');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.message = `${ReasonPhrases.UNAUTHORIZED}: ${message}`;
  }
}

module.exports = UnauthorizedError;
