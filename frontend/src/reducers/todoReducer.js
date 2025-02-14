const initialState = { todos: [] };

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo => todo._id === action.payload._id ? action.payload : todo),
      };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter(todo => todo._id !== action.payload) };
    default:
      return state;
  }
}
