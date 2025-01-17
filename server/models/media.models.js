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
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    summary: new Schema({
      short: {
        type: String,
      },
      medium: {
        type: String,
      },
      long: {
        type: String,
      },
    }),
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
