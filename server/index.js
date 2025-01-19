import express from "express";
import cookieParser from "cookie-parser";
import "./config.js";
import { connectDB } from "./Database/db.js";
import authRoute from "./Routes/authRoute.js";
import mediaRoute from "./Routes/mediaRoute.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authMiddleware, authRoute);
app.use("/api/files", authMiddleware, mediaRoute);

app.use(errorHandler);

const buildPath = path.join(__dirname, "dist");

// Serve static files
app.use(express.static(buildPath));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

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
