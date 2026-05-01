const CustomError = require('./CustomError.js');
const UnauthorizedError = require('./UnauthorizedError.js.js');
const BadRequestError = require('./BadRequestError.js');
const NotFoundError = require('./NotFoundError.js');
const InternalServerError = require('./internalServerError.js');
const ConflictError = require('./ConflictError.js');

module.exports = {
    CustomError,
    UnauthorizedError,
    BadRequestError,
    NotFoundError,
    InternalServerError,
    ConflictError
}