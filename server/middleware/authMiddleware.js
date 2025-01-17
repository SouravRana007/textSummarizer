import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const jwtSecret = process.env.JWT_SECRET;

const PUBLIC_ROUTES = ["/login", "/register", "/logout"];

export const authMiddleware = async (req, res, next) => {
  try {
    const url = req.url;
    if (PUBLIC_ROUTES.includes(url)) {
      return next();
    }

    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    // Fetch the user details from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    next();

    // res.json({
    //   id: user._id,
    //   email: user.email,
    //   name: user.name,
    // });
  } catch (error) {
    res.status(401).json({ error: "Invalid token or unauthorized" });
  }
};
