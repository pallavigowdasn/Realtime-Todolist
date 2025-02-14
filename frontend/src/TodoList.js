import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, [todos]);  // <-- Depend on todos to refetch when it changes
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const res = await axios.put(`http://localhost:5000/api/todos/${editingId}`, { name, email });
      setTodos(todos.map(todo => (todo._id === editingId ? res.data : todo)));
      setEditingId(null);
    } else {
      const res = await axios.post("http://localhost:5000/api/todos", { name, email });
      setTodos([...todos, res.data]);
    }
    setName("");
    setEmail("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleEdit = (todo) => {
    setName(todo.name);
    setEmail(todo.email);
    setEditingId(todo._id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todo List</h2>
      <form onSubmit={handleSubmit} className="mb-4 text-center">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-control mb-2 w-50 mx-auto" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control mb-2 w-50 mx-auto" />
        <button type="submit" className="btn btn-primary w-50">{editingId ? "Update" : "Add"} Todo</button>
      </form>
      <div className="row">
        {todos.map(todo => (
          <div key={todo._id} className="col-lg-3 mb-4">
            <div className="card p-3">
              <div className="card-body">
                <h5 className="card-title">{todo.name}</h5>
                <p className="card-text">{todo.email}</p>
                <button onClick={() => handleEdit(todo)} className="btn btn-warning me-2">Edit</button>
                <button onClick={() => handleDelete(todo._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
