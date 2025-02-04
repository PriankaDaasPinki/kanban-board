import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../Authentication/api";

// API URLs for respective CRUD operations
const projectsUrl = API_URL + "/projects/list";
const createProjectUrl = API_URL + "/projects/create";
const updateProjectUrl = API_URL + "/projects/update";
const deleteProjectUrl = API_URL + "/projects";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const res = await axios.get(projectsUrl);
    return res.data.projects;
  }
);

// Async Thunks for create, update, and delete operations
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    const res = await axios.post(createProjectUrl, projectData);
    return res.data.project;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }) => {
    const res = await axios.put(`${updateProjectUrl}/${id}`, projectData);
    return res.data.project;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    await axios.delete(`${deleteProjectUrl}/${id}`);
    return id; // Return the deleted project ID to remove it from the state
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    isLoading: false,
    projects: [],
    error: null,
  },
  extraReducers: (builder) => {
    // Handle fetchProjects actions
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.projects = [];
      state.error = action.error.message;
    });

    // Handle addProject action
    builder.addCase(addProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects.push(action.payload);
      state.error = null;
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Handle updateProject action
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProject = action.payload;
      const index = state.projects.findIndex((project) => project.id === updatedProject.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
      }
      state.error = null;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Handle deleteProject action
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
  reducers: {
    showProjects: (state) => state,
  },
});

export const { showProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
