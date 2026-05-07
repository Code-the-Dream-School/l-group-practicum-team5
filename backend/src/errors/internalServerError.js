const CustomError = require('./CustomError');

class InternalServerError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.message = 'Internal Server Error: ' + message;
  }
}

module.exports = InternalServerError;
