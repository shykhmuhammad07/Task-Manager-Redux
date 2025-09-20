import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo } from "../Reducers/todoSlice";
import "./Todo.css";

function Todo() {
  const todoRef = useRef();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [isAdding, setIsAdding] = useState(false);

  function handleTodo(e) {
    e.preventDefault();
    if (!todoRef.current.value) {
      Swal.fire({
        icon: "error",
        title: "Please Enter The Field !",
      });
    }
    if (todoRef.current.value.trim() !== "") {
      setIsAdding(true);
      setTimeout(() => {
        dispatch(addTodo(todoRef.current.value));
        todoRef.current.value = "";
        setIsAdding(false);
      }, 300);
    }
  }

  function handleEdit(id, oldTitle) {
    const newTitle = prompt("Enter new title", oldTitle);
    if (newTitle && newTitle.trim() !== "") {
      dispatch(editTodo({ id, newTitle }));
    }
  }

  function handleRemove(id, index) {
    const listItem = document.getElementById(`todo-${id}`);
    if (listItem) {
      listItem.classList.add("removing");
      setTimeout(() => {
        dispatch(removeTodo({ index }));
      }, 300);
    }
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="app-header">
          <h1>
            <span className="icon">✓</span>
            Task Manager
          </h1>
          <p className="subtitle">Organize your day efficiently</p>
        </header>

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          {/* <div className="stat">
            <span className="stat-number">
              {todos.filter(todo => !todo.completed).length}
            </span>
            <span className="stat-label">Pending</span>
          </div> */}
        </div>

        <form
          onSubmit={handleTodo}
          className={`todo-form ${isAdding ? "adding" : ""}`}
        >
          <div className="input-wrapper">
            <input
              ref={todoRef}
              type="text"
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button type="submit" className="add-button" disabled={isAdding}>
              <span className="button-icon">+</span>
              <span className="button-text">Add Task</span>
            </button>
          </div>
        </form>

        <div className="todo-list-container">
          {todos.length > 0 ? (
            <ul className="todo-list">
              {todos.map((todo, index) => (
                <li key={todo.id} id={`todo-${todo.id}`} className="todo-item">
                  <div className="todo-content">
                    <span className="todo-text">{todo.title}</span>
                    <div className="todo-actions">
                      <button
                        onClick={() => handleEdit(todo.id, todo.title)}
                        className="action-button edit-button"
                        aria-label="Edit task"
                      >
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                        >
                          <path
                            fill="currentColor"
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemove(todo.id, index)}
                        className="action-button delete-button"
                        aria-label="Delete task"
                      >
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                        >
                          <path
                            fill="currentColor"
                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks yet</h3>
              <p>Add a task to get started with your day</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
