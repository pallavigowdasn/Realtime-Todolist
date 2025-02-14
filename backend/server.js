require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/todosDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("newTask", (task) => {
    io.emit("taskAdded", task);
  });

  socket.on("updateTask", (task) => {
    io.emit("taskUpdated", task);
  });

  socket.on("deleteTask", (taskId) => {
    io.emit("taskDeleted", taskId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);
//app.use("/api/users", require("./routes/userRoutes"));
//const authRoutes = require("./routes/authRoutes");

//app.use("/api/auth", authRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
