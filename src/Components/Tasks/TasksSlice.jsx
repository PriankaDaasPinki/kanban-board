import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tasksUrl = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get(tasksUrl);
  return res.data;
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    isLoading: false,
    tasks: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.tasks = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    showTasks: (state) => state,
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, completed } = action.payload;
      const isTaskExist = state.tasks.filter((task) => task.id === id);
      if (isTaskExist) {
        isTaskExist[0].title = title;
        isTaskExist[0].completed = completed;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
  },
});

export const { showTasks, addTask, deleteTask, updateTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
