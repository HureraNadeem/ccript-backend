const ValidationError = require('mongoose').Error.ValidationError; // Import Mongoose's ValidationError

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const handleValidationError = (err, res) => {
  const errors_ = Object.values(err.errors).map((error) => error.message);
  return res.status(400).json({
    status: 'fail',
    message: errors_[0],
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err instanceof ValidationError) {
    handleValidationError(err, res);
  }

  sendError(err, res);
};

module.exports = globalErrorHandler;
