import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user?.id;

    if (!userId) {
      return cb(new Error("User ID is required"), null);
    }

    const userUploadDir = path.join("uploads", userId.toString());
    fs.mkdirSync(userUploadDir, { recursive: true });

    cb(null, userUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// export const handleMulterError = (error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     throw new ApiError(400, `Upload error: ${error.message}`);
//   } else if (error) {
//     throw new ApiError(400, error.message);
//   }
//   next();
// };

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
