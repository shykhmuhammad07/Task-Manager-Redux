import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem('todo')) ||[]
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        title: action.payload,
        id: nanoid(),
      };
      state.todos.push(todo);
      localStorage.setItem('todo', JSON.stringify(state.todos))
    },
    removeTodo: (state, action) => {
      state.todos.splice(action.payload.index, 1);
      localStorage.setItem('todo', JSON.stringify(state.todos))
    },
    editTodo: (state, action) => {
      const { id, newTitle } = action.payload;
      const todo = state.todos.find((e) => e.id === id);
      todo.title = newTitle;
      localStorage.setItem('todo', JSON.stringify(state.todos))
    },
  },
});

export  const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
