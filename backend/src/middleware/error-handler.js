const { CustomError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
<<<<<<< Updated upstream
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.error(err);
  return res.status(500).json({ msg: 'Something went wrong, try again later' });
};
=======
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    console.error(err)
    return res.status(500).json('Something went wrong, try again later')
}
>>>>>>> Stashed changes

module.exports = errorHandlerMiddleware;
