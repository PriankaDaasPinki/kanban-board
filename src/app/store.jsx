import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../Components/Tasks/TasksSlice";
import modulesSliceReducer from "../Components/Project_Modules/ModuleSlice";
import authSliceReducer from "../Components/Authentication/authSlice";

const store = configureStore({
  reducer: {
    authReducer: authSliceReducer,
    tasksReducer: tasksSliceReducer,
    modulesReducer: modulesSliceReducer,
  },
});
export default store;
