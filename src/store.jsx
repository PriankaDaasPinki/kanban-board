import { applyMiddleware, createStore } from "redux";
import taskReducer from "./Services/reducers/taskReducers";
import { thunk } from "redux-thunk";

export const store = createStore(taskReducer, applyMiddleware(thunk));
