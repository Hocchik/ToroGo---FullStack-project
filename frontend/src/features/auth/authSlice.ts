import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/mototaxiApi';
import type { AuthState, LoginRequest, RegisterRequest } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  roles: [],
  status: 'idle',
  error: null
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest) => {
    const response = await authApi.register(userData);
    localStorage.setItem('token', response.token);
    if (response.role) {
      localStorage.setItem('role', response.role);
    }
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials);
    localStorage.setItem('token', response.token);
    if (response.role) {
      localStorage.setItem('role', response.role);
    }
    return response;
  }
);

export const selectRole = createAsyncThunk(
  'auth/selectRole',
  async (role: string) => {
    const response = await authApi.selectRole(role);
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', role);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.roles = [];
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role || null;
        state.roles = action.payload.roles || [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Registration failed';
      });
      
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;