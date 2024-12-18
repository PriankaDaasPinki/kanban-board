import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userUrl = "http://10.20.2.39/drf-finance/login/"; // Replace with your actual base URL

// Configure Axios instance
const api = axios.create({
  baseURL: userUrl,
});

// AsyncThunk to log in user
export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (userInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(userUrl, userInfo);
      const data = response.data; // Assuming the token and user info are in `data`

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Set token for authenticated requests
      api.defaults.headers.common["Authorization"] = `token ${data.token}`;

      // After successful login, trigger loading the user data
      dispatch(loadUser());

      return data; // Return the data for `fulfilled` case
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
      const { data } = await axios.get(
        "http://10.20.2.39/drf-finance/profiles/me/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 401
          ? "Unauthorized access. Please log in again."
          : status === 403
          ? "Access forbidden. Contact support if this persists."
          : error.response?.data?.detail || "Error loading user data.";
      return rejectWithValue(message);
    }
  }
);

export const chekAuthentication = createAsyncThunk(
  "auth/chekAuthentication",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");

    try {
      const { data } = await axios.get(
        "http://10.20.2.39/drf-finance/token-status/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error loading user data");
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: "user",
  initialState: {
    msg: "",
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || "",
    isAuthenticate: null,
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logInUser.fulfilled, (state, action) => {
      console.log("action if fulfill", action);
      state.isLoading = false;
      state.error = action.payload.non_field_errors || null;

      if (state.error) {
        toast.error("Username or password is incorrect");
      } else {
        state.msg = action.payload.msg;
        state.token = action.payload.token;
        state.isAuthenticate = true;
        toast.success("Sign-in successful");
      }
    });

    builder.addCase(logInUser.rejected, (state, action) => {
      state.isLoading = false;
      if (state.error === "Request failed with status code 401") {
        state.error = "Access Denied! Invalid Credentials";
      } else {
        state.error = action.error.message;
      }
      state.error =
        action.payload?.non_field_errors ||
        action.error?.message ||
        "An error occurred";
      toast.error(state.error);
    });

    // LoadUser cases
    builder.addCase(loadUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      const { payload, error } = action;
      state.isLoading = false;
      state.error = payload || error.message;
    });

    // Check Authentication cases
    builder.addCase(chekAuthentication.fulfilled, (state, action) => {
      state.isAuthenticate = action.payload.status === "valid";
      if (!state.isAuthenticate) {
        state.token = null;
        state.user = null;
        localStorage.clear();
      }
    });
    builder.addCase(chekAuthentication.rejected, (state, action) => {
      const { payload, error } = action;
      state.isAuthenticate = false;
      state.error = payload || error.message;
    });
  },

  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },

    logOutUser: (state) => {
      // Clear state and localStorage on logout
      state.user = null;
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const useIsLoggedIn = (state) => state.user.isAuthenticate;
export const useUser = (state) => state.user.user;
export const useToken = (state) => state.user.token;
export const { addToken, logOutUser } = authSlice.actions;
export default authSlice.reducer;
