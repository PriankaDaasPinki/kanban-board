import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../Components/Tasks/TasksSlice";

const store = configureStore({
  reducer: {
    tasksReducer: tasksSliceReducer,
  },
});
export default store;
