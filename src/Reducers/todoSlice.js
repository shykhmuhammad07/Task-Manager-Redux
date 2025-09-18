import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      title: "hello world",
      id: 1,
    },
  ],
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
    },
    removeTodo: (state, action) => {
      state.todos.splice(action.payload.index, 1);
    },
    editTodo: (state, action) => {
      const { id, newTitle } = action.payload;
      const todo = state.todos.find((e) => e.id === id);

      todo.title = newTitle;
    },
  },
});

export  const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
