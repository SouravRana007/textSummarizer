import { ObjectId } from "mongodb";

import Media from "../models/media.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  generateSummaryFromFile,
  generateSummaryFromText,
} from "../services/summaryAI.js";

const postMediaInfo = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const { fileName, summaryType } = req.body;

  if (!fileName) {
    throw new ApiError(400, "File name is required!");
  }
  if (!summaryType) {
    throw new ApiError(400, "Summary Type is required!");
  }

  const file = req.file;
  const { summary, originalText } = await generateSummaryFromFile(
    file,
    summaryType
  );

  if (!originalText) {
    throw new ApiError(400, "Unable to parse content. Please try other file!");
  }

  const media = new Media({
    userId: new ObjectId(userId),
    filePath: file.path,
    fileType: file.mimetype,
    fileName,
    originalText,
    summary: {
      [summaryType]: summary,
    },
  });

  const savedMedia = await media.save();
  res.status(200).json(new ApiResponse(200, savedMedia));
});

export const putMediaInfo = asyncHandler(async (req, res) => {
  const mediaId = req.params.mediaId;
  const existingMedia = await Media.findById(new ObjectId(mediaId));
  if (!existingMedia) {
    throw new ApiError(404, "Media not found!");
  }

  const { summaryType } = req.body;

  if (!summaryType) {
    throw new ApiError(400, "Summary Type required!");
  }

  if (!["short", "medium", "long"].includes(summaryType)) {
    throw new ApiError(400, "Invalid summary type!");
  }

  if (existingMedia.summary[summaryType]) {
    return res.status(200).json(
      new ApiResponse(200, {
        originalText: existingMedia.originalText,
        summary: existingMedia.summary[summaryType],
      })
    );
  }

  const { summary } = await generateSummaryFromText(
    existingMedia.originalText,
    summaryType
  );

  await Media.updateOne(
    { _id: new ObjectId(mediaId) },
    {
      [`summary.${summaryType}`]: summary,
    }
  );

  res.status(200).json(
    new ApiResponse(200, {
      summary,
    })
  );
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
