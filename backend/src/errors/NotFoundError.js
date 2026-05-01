const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = "Not Found: " + message;
  }
}

module.exports = NotFoundError;