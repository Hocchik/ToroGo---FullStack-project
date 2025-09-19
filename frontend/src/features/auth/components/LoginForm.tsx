import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlice';
import type { AppDispatch, RootState } from '../../../store/index';
import type { LoginRequest } from '../../../types/auth';

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser(credentials));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        disabled={status === 'loading'}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        {status === 'loading' ? 'Loading...' : 'Login'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};