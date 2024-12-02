import { GET_TASK_FAILED, GET_TASK_REQUEST, GET_TASK_SUCCESS } from "../constants/taskConstants";

const initialTaskState = {
  isLoading: false,
  tasks: [],
  error: null,
};

console.log('GET_TASK_REQUEST',GET_TASK_REQUEST)

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload,
      };

    case GET_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
