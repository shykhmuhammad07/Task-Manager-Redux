import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../Reducers/todoSlice";

export const store = configureStore({
  reducer: todoSlice,
});
