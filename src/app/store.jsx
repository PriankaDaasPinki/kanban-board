import { configureStore } from "@reduxjs/toolkit";
// import modulesSliceReducer from "../Components/Project_Modules/ModuleSlice";
import authSliceReducer from "../Components/Authentication/authSlice";

const store = configureStore({
  reducer: {
    authReducer: authSliceReducer,
    // modulesReducer: modulesSliceReducer,
  },
});
export default store;
