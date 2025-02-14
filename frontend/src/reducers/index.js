import { combineReducers } from "redux";
import todoReducer from "./todoReducer"; // Ensure this file exists

const rootReducer = combineReducers({
  todos: todoReducer, 
});

export default rootReducer;
