import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("not connected");
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// app.get("/test", (req, res) => {
//   res.json({ message: "Hello!" });
// });

app.use("/backend/user", userRouter);
app.use("/backend/auth", authRouter);
