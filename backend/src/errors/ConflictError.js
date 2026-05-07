const CustomError = require('./CustomError');

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Conflict: ' + message;
  }
}

module.exports = ConflictError;
