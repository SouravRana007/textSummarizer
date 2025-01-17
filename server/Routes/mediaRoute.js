import { Router } from "express";
// import { register, login } from "../Controllers/userController.js";

const router = Router();

router.route("/media").post(register); // post document, name, summaryTypes: ['short', 'medium', 'length'] -> BE will parse file, and generate summary
router.route("/media").get(login); // return get list of all media by userId
router.route("/media/:mediaId").get(); // return single media info

export default router;
