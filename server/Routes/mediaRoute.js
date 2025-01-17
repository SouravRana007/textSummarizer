import { Router } from "express";
import {
  getMediaInfo,
  getUserMediaInfo,
  postMediaInfo,
} from "../Controllers/mediaController.js";

const router = Router();

router.route("/").post(postMediaInfo); // post document, name, summaryTypes: ['short', 'medium', 'length'] -> BE will parse file, and generate summary
router.route("/").get(getMediaInfo); // return get list of all media by userId
router.route("/:mediaId").get(getUserMediaInfo); // return single media info

export default router;
