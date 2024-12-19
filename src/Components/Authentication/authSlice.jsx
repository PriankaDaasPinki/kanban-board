import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://10.20.2.39/drf-finance/";

// Configure Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Token ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AsyncThunk to log in user
export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (userInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("login/", userInfo);
      const data = response.data;
      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      // Set token for authenticated requests
      // api.defaults.headers.common["Authorization"] = `Token ${data.token}`;

      // Trigger loading the user data
      // dispatch(loadUser());

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Load user data if token exists
// export const loadUser = createAsyncThunk(
//   "auth/loadUser",
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");

//     if (!token) return rejectWithValue("No token found. Please log in again.");

//     try {
//       const response = await api.get("profiles/me/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       const message =
//         error.response?.data?.detail || "Error loading user data.";
//       return rejectWithValue(message);
//     }
//   }
// );

// Check authentication status
// export const chekAuthentication = createAsyncThunk(
//   "auth/chekAuthentication",
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     if (!token) return rejectWithValue("No token found");

//     try {
//       const response = await api.get("token-status/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Error checking authentication status"
//       );
//     }
//   }
// );

// Auth slice
export const authSlice = createSlice({
  name: "user",
  initialState: {
    msg: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
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
    },
  },
  extraReducers: (builder) => {
    // Handle logInUser cases
    builder.addCase(logInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logInUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.msg = payload.msg;
      state.token = payload.token;
      state.user = payload;
      state.isAuthenticate = true;
      toast.success("Sign-in successful");
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login failed";
      toast.error(state.error);
    });

    // Handle loadUser cases
    // builder.addCase(loadUser.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(loadUser.fulfilled, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.user = payload;
    // });
    // builder.addCase(loadUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message || "Failed to load user data";
    // });

    // Handle chekAuthentication cases
    // builder.addCase(chekAuthentication.fulfilled, (state, { payload }) => {
    //   state.isAuthenticate = payload.status === "valid";
    //   console.log("payload chekAuthentication ", payload);
    //   if (!state.isAuthenticate) {
    //     state.token = null;
    //     state.user = null;
    //     localStorage.clear();
    //   }
    // });
    // builder.addCase(chekAuthentication.rejected, (state, { payload }) => {
    //   state.isAuthenticate = false;
    //   state.error = payload || "Authentication check failed";
    // });
  },
});

export const { addToken, logOutUser } = authSlice.actions;

// Selectors
export const useIsLoggedIn = (state) => state?.authReducer?.isAuthenticate;
export const useUser = (state) => state?.authReducer?.user;
export const useToken = (state) => state?.authReducer?.token;

export default authSlice.reducer;
