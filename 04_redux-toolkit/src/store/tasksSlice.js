import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";

const createTask = title => ({
  id: nanoid(),
  title,
  completed: false,
  assignedTo: ""
});

const initialState = [
  createTask("Take out the garbage"),
  createTask("Water the plants")
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action) => {
      const task = createTask(action.payload);
      // We can mutate the state directly as Redux Toolkit uses Immer under the hood
      state.push(task);
    },
    toggle: (state, action) => {
      const task = state.find(task => task.id === action.payload.taskId);
      task.completed = action.payload.completed;
    },
    assignToUser: (state, action) => {
      const task = state.find(task => task.id === action.payload.taskId);
      task.assignedTo = action.payload.humanId;
    }
  }
});

export const toggleTask = createAction("tasks/toggle", (taskId, completed) => ({
  payload: { taskId, completed }
}));
