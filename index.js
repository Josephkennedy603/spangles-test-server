import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/users.js";
import todoRouter from "./routers/todos.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.listen(5000, async () => {
  console.log("Server Started");
  await mongoose.connect(
    "mongodb+srv://kennedy:kenne@cluster0.saqdv.mongodb.net/test"
  );
  console.log("DB connected");
});
