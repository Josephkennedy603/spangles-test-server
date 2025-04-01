import express from "express";
import Todo from "../models/todos.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const body = req.body;
    const { title, content } = body;

    const todo = await Todo.create({
      title: title,
      content: content,
    });
    res.status(200).send(todo);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/edit", async (req, res) => {
  try {
    const body = req.body;
    const { _id, title, content } = body;

    await Todo.findByIdAndUpdate(_id, {
      title,
      content,
    });
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default router;
