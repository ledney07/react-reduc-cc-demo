import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addTodo,
  selectTodos,
  selectStatus,
  fetchTodoAsync,
} from "./features/todos/todosSlice";

function App() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const todosList = useSelector(selectTodos);
  const status = useSelector(selectStatus);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const newtodo = inputRef.current.value;
    dispatch(addTodo(newtodo));

    inputRef.current.value = "";
  };

  const fetchTodo = (e) => {
    e.preventDefault();

    dispatch(fetchTodoAsync());
  };

  return (
    <div className="App">
      <h1>This is TODO</h1>
      <p>{status}</p>
      <form>
        <input ref={inputRef} type="text" placeholder="write your todo" />

        <button type="submit" onClick={handleAddTodo}>
          Add
        </button>
        <button type="submit" onClick={fetchTodo}>
          Fetch a TODO from the API
        </button>
      </form>

      <h2>Your Todos</h2>
      {todosList.map((todo, index) => (
        <h3 key={index}>{todo}</h3>
      ))}
    </div>
  );
}

export default App;
