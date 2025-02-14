const express = require("express");
const Todo = require("../models/Todo");

module.exports = (io) => {
  const router = express.Router();

  // Get all todos
  router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });

  // Add a new todo
  router.post("/", async (req, res) => {
    const { name, email } = req.body;
    const newTodo = new Todo({ name, email });
    await newTodo.save();
    
    io.emit("todoAdded", newTodo); // Broadcast event
    res.json(newTodo);
  });

  // Update a todo
  router.put("/:id", async (req, res) => {
    const { name, email } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

    io.emit("todoUpdated", updatedTodo); // Broadcast event
    res.json(updatedTodo);
  });

  // Delete a todo
  router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    
    io.emit("todoDeleted", req.params.id); // Broadcast event
    res.json({ message: "Todo deleted" });
  });

  return router;
};
