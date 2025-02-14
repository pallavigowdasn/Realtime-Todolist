import axios from "axios";
import socket from "../socket";

// Fetch all todos
export const getTodos = () => async (dispatch) => {
  const { data } = await axios.get("http://localhost:5000/api/todos");
  dispatch({ type: "GET_TODOS", payload: data });
};

// Add a todo
export const addTodo = (todo) => async (dispatch) => {
  await axios.post("http://localhost:5000/api/todos", todo);
};

// Update a todo
export const updateTodo = (id, updates) => async (dispatch) => {
  await axios.put(`http://localhost:5000/api/todos/${id}`, updates);
};

// Delete a todo
export const deleteTodo = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/api/todos/${id}`);
};

// Listen for WebSocket events
export const setupSocketListeners = () => (dispatch) => {
  socket.on("todoAdded", (todo) => dispatch({ type: "ADD_TODO", payload: todo }));
  socket.on("todoUpdated", (todo) => dispatch({ type: "UPDATE_TODO", payload: todo }));
  socket.on("todoDeleted", (id) => dispatch({ type: "DELETE_TODO", payload: id }));
};
