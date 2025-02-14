import { configureStore, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodos: (state, action) => action.payload,
    addTodo: (state, action) => [...state, action.payload],
    updateTodo: (state, action) => state.map(todo => todo._id === action.payload._id ? action.payload : todo),
    deleteTodo: (state, action) => state.filter(todo => todo._id !== action.payload),
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export const store = configureStore({ reducer: { todos: todoSlice.reducer } });

socket.on("taskAdded", (task) => store.dispatch(addTodo(task)));
socket.on("taskUpdated", (task) => store.dispatch(updateTodo(task)));
socket.on("taskDeleted", (taskId) => store.dispatch(deleteTodo(taskId)));

export { socket };

