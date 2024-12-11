import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../Components/Tasks/TasksSlice";
import projectsSliceReducer from "../Components/Projects/ProjectSlice";
import modulesSliceReducer from "../Components/Project_Modules/ModuleSlice";

const store = configureStore({
  reducer: {
    tasksReducer: tasksSliceReducer,
    projectsReducer: projectsSliceReducer,
    modulesReducer: modulesSliceReducer,
  },
});
export default store;
