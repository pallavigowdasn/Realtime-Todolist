import React from "react";
import TodoList from "./TodoList";
//import { Provider } from "react-redux";
//import { store } from "./store";


const App = () => {
  return (
   
      <div className="App">
        <h1 className="text-center">Real-Time Collaborative Todo List </h1>
     <TodoList/>
      
      </div>
    
  );
};

export default App;
