import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../Components/Tasks/TasksSlice";
import projectsSliceReducer from "../Components/Projects/ProjectSlice";

const store = configureStore({
  reducer: {
    tasksReducer: tasksSliceReducer,
    projectsReducer: projectsSliceReducer,
  },
});
export default store;
