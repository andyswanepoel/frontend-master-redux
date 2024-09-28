import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasksSlice";
import { humansSlice } from "./humansSlice";

// configureStore adds a few middlewares
export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    humans: humansSlice.reducer
  }
});
