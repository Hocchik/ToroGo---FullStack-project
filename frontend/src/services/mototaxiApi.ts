import axios from 'axios';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

const baseURL = 'http://localhost:3000/api';

export const mototaxiApi = axios.create({ baseURL });

// Interceptor para agregar token
mototaxiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: async (userData: RegisterRequest) => {
    const { data } = await mototaxiApi.post<LoginResponse>('/auth/register', userData);
    return data;
  },
    login: async (credentials: LoginRequest) => {
    const { data } = await mototaxiApi.post<LoginResponse>('/auth/login', credentials);
    return data;
  },
  selectRole: async (role: string) => {
    const { data } = await mototaxiApi.post<LoginResponse>('/auth/select-role', { role });
    return data;
  }
};