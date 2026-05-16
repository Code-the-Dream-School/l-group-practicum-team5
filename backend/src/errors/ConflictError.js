const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const CustomError = require('./CustomError');

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
    this.message = `${ReasonPhrases.CONFLICT}: ${message}`;
  }
}

module.exports = ConflictError;
