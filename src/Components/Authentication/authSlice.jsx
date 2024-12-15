import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://10.20.2.39"; // Replace with your actual base URL

// Sign in user thunk with axios
export const signInUser = createAsyncThunk(
  "signinuser",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      // Make a POST request using Axios
      const res = await axios.post(`${baseURL}/drf-finance/login/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If the response is successful, store the token and user info in localStorage
      if (res.status === 200) {
        const data = res.data;

        // Save token and user info to localStorage before dispatching loadUser
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        // After successful login, trigger loading the user data
        dispatch(loadUser());

        return data;
      } else {
        return rejectWithValue("Authentication failed");
      }
    } catch (error) {
      // Handle errors, including network issues or server errors
      return rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);

const usersUrl = "http://10.20.2.39/drf-finance/login/";

export const logInUsers = createAsyncThunk("users/logInUsers", async () => {
  const res = await axios.post(usersUrl, userInfo);
  return res.data;
});

export const authSlice = createSlice({
  name: "users",
  initialState: {
    msg: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || "",
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchModules.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchModules.fulfilled, (state, action) => {
      state.isLoading = false;
      state.modules = action.payload;
      state.error = null;
    });
    builder.addCase(fetchModules.rejected, (state, action) => {
      state.isLoading = false;
      state.modules = [];
      state.error = action.error.message;
    });
  },

  reducers: {
    showModules: (state) => state,
    addModule: (state, action) => {
      state.modules.push(action.payload);
    },
    updateModule: (state, action) => {
      const { id, title, completed } = action.payload;
      const isExist = state.modules.filter((module) => module.id === id);
      if (isExist) {
        isExist[0].title = title;
        isExist[0].completed = completed;
      }
    },

    deleteModule: (state, action) => {
      const id = action.payload;
      state.modules = state.projects.filter((module) => module.id !== id);
    },
  },
});

export const { showModules, addModule, deleteModule, updateModule } =
  authSlice.actions;
export default authSlice.reducer;
