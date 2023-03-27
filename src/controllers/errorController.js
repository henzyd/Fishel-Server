module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  //? NOTE: adding 4 parameters to a function tells express that this is an error handling middleware
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
