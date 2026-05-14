const CustomError = require('./CustomError');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = 'Unauthorized: ' + message;
  }
}

module.exports = UnauthorizedError;
