const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: String,
  email: String,
  completed: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);
