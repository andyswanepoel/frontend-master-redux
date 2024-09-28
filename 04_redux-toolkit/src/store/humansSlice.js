import { createSlice, nanoid } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasksSlice";

const createHuman = name => ({
  id: nanoid(),
  name,
  taskIds: []
});

const initialState = [createHuman("Andy")];

export const humansSlice = createSlice({
  name: "humans",
  initialState,
  reducers: {
    add: (state, action) => {
      const human = createHuman(action.payload);
      state.push(human);
    }
  },
  // This basically listens to actions from other slices, i.e., tasksSlice
  // Basically anything that isn't defined in reducers object, needs to be added in extraReducers
  extraReducers: builder => {
    builder.addCase(tasksSlice.actions.assignToUser, (state, action) => {
      state.forEach(human => {
        if (human.id === action.payload.humanId) {
          human.taskIds.push(action.payload.taskId);
        } else {
          human.taskIds = human.taskIds.filter(
            id => id !== action.payload.taskId
          );
        }
      });
    });
  }
});
