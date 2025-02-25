// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// import { API_URL } from "../Authentication/api";

// const projectsUrl = API_URL + "/projects/list";

// export const fetchProjects = createAsyncThunk(
//   "projects/fetchProjects",
//   async () => {
//     const res = await axios.get(projectsUrl);
//     return res.data.projects;
//   }
// );

// export const projectsSlice = createSlice({
//   name: "projects",
//   initialState: {
//     isLoading: false,
//     projects: [],
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchProjects.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchProjects.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.projects = action.payload;
//       state.error = null;
//     });
//     builder.addCase(fetchProjects.rejected, (state, action) => {
//       state.isLoading = false;
//       state.projects = [];
//       state.error = action.error.message;
//     });
//   },
//   reducers: {
//     showProjects: (state) => state,
//     addProject: (state, action) => {
//       console.log("payload add project ",action.payload);
//       const project = async () => {
//         const res = await axios.post(projectsUrl + "create", action.payload);
//         console.log(res.data.projects);
//         return res.data.projects; 
//       };
//       state.projects.push(project);
//     },
//     updateProject: (state, action) => {
//       const { id, title, completed } = action.payload;
//       const isExist = state.projects.filter((project) => project.id === id);
//       if (isExist) {
//         isExist[0].title = title;
//         isExist[0].completed = completed;
//       }
//     },
//     deleteProject: (state, action) => {
//       const id = action.payload;
//       state.projects = state.projects.filter(
//         (project) => project.project_id !== id
//       );
//     },
//   },
// });

// export const { showProjects, addProject, deleteProject, updateProject } =
//   projectsSlice.actions;
// export default projectsSlice.reducer;
