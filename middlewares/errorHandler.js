const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
      stack: err.stack
    });
  }

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.isOperational ? err.message : "Something went wrong"
    });
  }
};

export default errorHandler;