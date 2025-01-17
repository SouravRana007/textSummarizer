import { Router } from "express";
import {
  register,
  login,
  logout,
  userInfo,
} from "../Controllers/userController.js";

const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/current-user").get(userInfo);
export default router;
