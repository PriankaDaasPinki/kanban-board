// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL of your backend
const baseURL = 'http://10.20.2.39';  // Replace with your actual base URL

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/drf-finance/login/`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;





// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;






// Set Up Axios Instance (Optional)
// If you want to add the Authorization token in your Axios requests automatically, you can set up an Axios instance.
// src/axios.js
import axios from 'axios';

// Base URL for API requests
const baseURL = 'http://10.20.2.39'; // Replace with your base URL

const authAxios = axios.create({
  baseURL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authAxios;





// Set Up Login Component
// Now let’s create a React component for the login form where users will input their credentials.
// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { email, password };

    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        navigate('/dashboard'); // Redirect to a protected route after login
      })
      .catch((err) => {
        setError(err || 'Login failed');
      });
  };

  if (isAuthenticated) {
    navigate('/dashboard'); // Redirect to dashboard if already authenticated
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;







// Set Up React Router
// You need to set up React Router to handle navigation after login.
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Add other routes, like dashboard */}
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;











// Protecting Routes (Optional)
// If you want to protect a route, you can create a custom ProtectedRoute component that only allows authenticated users to access certain pages.
// src/components/ProtectedRoute.js
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/authSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default ProtectedRoute;








// Inside App.js
import ProtectedRoute from './components/ProtectedRoute';

<ProtectedRoute>
  <Route path="/dashboard" element={<Dashboard />} />
</ProtectedRoute>








// Add the Dashboard or Protected Page
// Create a simple Dashboard component to be accessed after login.
// src/components/Dashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
