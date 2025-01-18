import express from "express";
import cookieParser from "cookie-parser";
import "./config.js";
import { connectDB } from "./Database/db.js";
import authRoute from "./Routes/authRoute.js";
import mediaRoute from "./Routes/mediaRoute.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
  await delay(2000);
  next();
});

app.use("/api/auth", authMiddleware, authRoute);
app.use("/api/files", authMiddleware, mediaRoute);

app.use(errorHandler);

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
