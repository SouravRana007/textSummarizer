import Media from "../models/media.models.js";
import { ObjectId } from "mongodb";

import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const postMediaInfo = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { filePath, fileType, fileName, summary } = req.body;
  if (!fileName || !filePath || !fileType) {
    throw new ApiError(400, "fileName, filePath and fileType are required");
  }
  const existingMedia = await Media.findOne({ filePath, fileName, fileType });

  if (existingMedia) {
    throw new ApiError(400, "Media with the same file already exists");
  }
  const media = new Media({
    userId: new ObjectId(userId),
    filePath,
    fileType,
    fileName,
    summary,
  });
  const savedMedia = await media.save();
  res.status(200).json(new ApiResponse(200, savedMedia));
});

// get All
const getMediaInfo = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const media = await Media.find({
    userId: new ObjectId(userId),
  }).sort({ createdAt: -1 });
  if (!media) {
    throw new ApiError(400, "No media found for this user");
  }
  return res.status(200).json(new ApiResponse(200, media));
});

// fetches a single media
const getUserMediaInfo = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const mediaId = req.params.mediaId;

  if (!userId) {
    throw new ApiError(400, "User ID is missing");
  }

  const media = await Media.findById(mediaId);
  if (!media) {
    throw new ApiError(400, "Media not found");
  }

  return res.status(200).json(new ApiResponse(200, media));
});

export { getMediaInfo, postMediaInfo, getUserMediaInfo };
