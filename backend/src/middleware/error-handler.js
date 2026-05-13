const { CustomError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.error(err);
  return res.status(500).json({ msg: 'Something went wrong, try again later' });
};

module.exports = errorHandlerMiddleware;
