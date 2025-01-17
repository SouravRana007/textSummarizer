import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  if (error instanceof multer.MulterError) {
    error.message = `Upload error: ${err.message}`;
  }

  // Log to console for dev
  console.log(err);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
