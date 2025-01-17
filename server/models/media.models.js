import mongoose, { Schema, Types } from "mongoose";
const mediaSchema = new Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    fileName: {
      type: String,
      required: true,
    },
    summary: new Schema({
      shortSummary: {
        type: String,
      },
      mediumSummary: {
        type: String,
      },
      longSummary: {
        type: String,
      },
    }),
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
