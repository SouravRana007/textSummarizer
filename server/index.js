import express from "express";
// import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "./config.js";
import { connectDB } from "./Database/db.js";
import userRoute from "./Routes/userRoute.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

// dotenv.config({
//   path: "./.env",
// });

const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(cookieParser());

app.use("/api", authMiddleware, userRoute);

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
