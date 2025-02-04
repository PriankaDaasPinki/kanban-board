import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { toast } from "react-toastify";

import api from "./api";

// const BASE_URL = "http://10.20.2.39/drf-finance/";
// const BASE_URL = "http://127.0.0.1:8000/";

// Configure Axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AsyncThunk to log in user
export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (userInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userInfo);
      console.log("response ", response);
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("session_token", response.data.session_token);
      const data = response.data;
      console.log("data ", data);
      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Load user data if token exists
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) return rejectWithValue("No token found. Please log in again.");

    try {
      const response = await api.get("profiles/me/", {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.detail || "Error loading user data.";
      return rejectWithValue(message);
    }
  }
);

// Check authentication status
export const chekAuthentication = createAsyncThunk(
  "auth/chekAuthentication",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");

    try {
      const response = await api.get("token-status/", {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error checking authentication status"
      );
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: "user",
  initialState: {
    message: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    // access_token: localStorage.getItem("access_token") || "",
    // session_token: localStorage.getItem("session_token") || "",
    token: localStorage.getItem("token") || "",
    isAuthenticate: localStorage.getItem("token") ? true : false,
    isLoading: false,
    error: null,
  },
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    logOutUser: (state) => {
      localStorage.clear();
      state.isAuthenticate = false;
      toast.error("Logged Out");
    },
  },
  extraReducers: (builder) => {
    // Handle logInUser cases
    builder.addCase(logInUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logInUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.msg = payload.msg;
      state.token = payload.token;
      state.user = payload;
      state.isAuthenticate = true;
      state.error = null;
      toast.success("Sign-in successful");
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login failed";
      toast.error(state.error);
    });

    // Handle loadUser cases
    builder.addCase(loadUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to load user data";
    });

    // Handle chekAuthentication cases
    builder.addCase(chekAuthentication.fulfilled, (state, { payload }) => {
      state.isAuthenticate = payload.status === "valid";
      console.log("payload chekAuthentication ", payload);
      if (!state.isAuthenticate) {
        state.token = null;
        state.user = null;
        localStorage.clear();
      }
    });
    builder.addCase(chekAuthentication.rejected, (state, { payload }) => {
      state.isAuthenticate = false;
      state.error = payload || "Authentication check failed";
    });
  },
});

export const { addToken, logOutUser } = authSlice.actions;

// Selectors
export const useIsLoggedIn = (state) => state?.authReducer?.isAuthenticate;
export const useUser = (state) => state?.authReducer?.user;
export const useToken = (state) => state?.authReducer?.token;

export default authSlice.reducer;
