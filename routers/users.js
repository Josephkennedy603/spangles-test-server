import express from "express";
import User from "../models/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { name, email, password, role } = body;

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;

    const account = await User.find({ email: email });

    if (!account) {
      res.status(400).send("User not found!");
    } else {
      const user = await User.findOne({ email: email, password: password });
      if (!user) {
        res.status(400).send("Invalid credentials!");
      } else {
        res.status(200).send(user);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
