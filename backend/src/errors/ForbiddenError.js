const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const CustomError = require('./CustomError');

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.message = `${ReasonPhrases.FORBIDDEN}: ${message}`;
  }
}

module.exports = ForbiddenError;
