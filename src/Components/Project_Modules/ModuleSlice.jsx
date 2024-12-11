import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const modulesUrl = "https://jsonplaceholder.typicode.com/todos";

export const fetchModules = createAsyncThunk("modules/fetchModules", async () => {
  const res = await axios.get(modulesUrl);
  return res.data;
});

export const modulesSlice = createSlice({
  name: "modules",
  initialState: {
    isLoading: false,
    modules: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModules.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchModules.fulfilled, (state, action) => {
      state.isLoading = false;
      state.modules = action.payload;
      state.error = null;
    });
    builder.addCase(fetchModules.rejected, (state, action) => {
      state.isLoading = false;
      state.modules = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    showModules: (state) => state,
    addModule: (state, action) => {
      state.modules.push(action.payload);
    },
    updateModule: (state, action) => {
      const { id, title, completed } = action.payload;
      const isExist = state.modules.filter((module) => module.id === id);
      if (isExist) {
        isExist[0].title = title;
        isExist[0].completed = completed;
      }
    },
    deleteModule: (state, action) => {
      const id = action.payload;
      state.modules = state.projects.filter((module) => module.id !== id);
    },
  },
});

export const { showModules, addModule, deleteModule, updateModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
