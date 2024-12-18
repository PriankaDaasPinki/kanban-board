import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../Components/Tasks/TasksSlice";
import projectsSliceReducer from "../Components/Projects/ProjectSlice";
import modulesSliceReducer from "../Components/Project_Modules/ModuleSlice";
import authSliceReducer from "../Components/Authentication/authSlice";

const store = configureStore({
  reducer: {
    authReducer: authSliceReducer,
    tasksReducer: tasksSliceReducer,
    projectsReducer: projectsSliceReducer,
    modulesReducer: modulesSliceReducer,
  },
});
export default store;
