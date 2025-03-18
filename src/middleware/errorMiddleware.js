const ErrorHandler = require("../utils/ErrorHandler");

const errorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";

  console.log(`[ERROR] ${statusCode} = ${message}`);

  res.status(statusCode).json({
    status:"error",
    message:message,
  });
}

module.exports = errorMiddleware;