import axios from "axios";

import {
  GET_TASK_FAILED,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
} from "../constants/taskConstants";

const taskUrl = "https://jsonplaceholder.typicode.com/todo";

export const getAllTasks = () => async (dispatch) => {

  dispatch({ type: GET_TASK_REQUEST });

  try {
    const res = await axios.get(taskUrl);
    console.log('res',res)
    dispatch({ type: GET_TASK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_TASK_FAILED, payload: error.message });
  }
};
