import express from "express";
import User from "./models/user.models.js";
import { connectDB } from "./Database/db.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());

// connecting mongoDB with the server
connectDB()
  .then(() => {
    app.on("Error", (error) => {
      console.error("Error : ", error);
      throw error;
    });

    // console.log("Port: ", PORT);
    app.listen(PORT, () => {
      console.log(`Server is listening at : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO_DB Connection Failed : ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//register api
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
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
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});
