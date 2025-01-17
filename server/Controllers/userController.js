import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//register api
const jwtSecret = process.env.JWT_SECRET;
// const app = express();

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => !field || field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (!email.includes === "@") {
    throw new Error("@ symbol is required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json(new ApiResponse(200, user, "User registered Successfully"));
});

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Name and password is required");
    }
    const user = await User.findOne({ email });
    if (user) {
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return res.status(422).json({ error: "Incorrect password" });
      }
      if (passwordOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            console.log("fail to generate token: ", err);
            if (err) {
              return res
                .status(500)
                .json({ error: "Failed to generate token" });
            }
            res.cookie("token", token).json({ user });
          }
        );
      }
    }
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};
// logout endpoint
const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(0), // Expire the cookie immediately
    })
    .json({ success: true, message: "Logged out successfully" });
};

//current user details authMiddleware used
const userInfo = async (req, res) => {
  res.status(200).json(req.user);
  return;
};

export { register, login, logout, userInfo };
