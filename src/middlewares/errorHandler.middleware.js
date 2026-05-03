export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    msj: err.message || "Internal Server Error",
  });
};
