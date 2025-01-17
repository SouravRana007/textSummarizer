import { Router } from "express";
import {
  getMediaInfo,
  getUserMediaInfo,
  postMediaInfo,
  putMediaInfo,
} from "../Controllers/mediaController.js";
import { upload } from "../middleware/imageStorage.js";

const router = Router();

router.route("/").post(upload.single("document"), postMediaInfo);
router.route("/:mediaId").put(putMediaInfo); // post document, name, summaryTypes: ['short', 'medium', 'length'] -> BE will parse file, and generate summary
router.route("/").get(getMediaInfo); // return get list of all media by userId
router.route("/:mediaId").get(getUserMediaInfo); // return single media info

export default router;
