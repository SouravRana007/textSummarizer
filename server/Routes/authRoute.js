import { Router } from "express";
import {
  register,
  login,
  logout,
  userInfo,
} from "../Controllers/authController.js";

const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/current-user").get(userInfo);
export default router;
