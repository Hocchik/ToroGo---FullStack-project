import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authSlice';
import type { AppDispatch, RootState } from '../../../store';
import type { RegisterRequest } from '../../../types/auth';

export const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState<RegisterRequest>({
    full_name: '',
    dni: '',
    age: 18,
    email: '',
    password: '',
    role: 'passenger'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={formData.full_name}
        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        placeholder="Nombre completo"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={formData.dni}
        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
        placeholder="DNI"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
        placeholder="Edad"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Contraseña"
        className="w-full p-2 border rounded"
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="passenger">Pasajero</option>
        <option value="driver">Conductor</option>
      </select>
      
      {formData.age < 18 && (
        <input
          type="number"
          value={formData.guardian_id || ''}
          onChange={(e) => setFormData({ ...formData, guardian_id: parseInt(e.target.value) })}
          placeholder="ID del tutor (requerido para menores)"
          className="w-full p-2 border rounded"
        />
      )}

      <button 
        type="submit"
        disabled={status === 'loading'}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {status === 'loading' ? 'Registrando...' : 'Registrarse'}
      </button>
      
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};