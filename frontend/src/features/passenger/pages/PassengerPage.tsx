import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

export const PassengerPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bienvenido, {user?.full_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Solicitar Viaje</h2>
          <p className="text-gray-600">Solicita un mototaxi para tu próximo viaje</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Historial</h2>
          <p className="text-gray-600">Ver historial de viajes</p>
        </div>
      </div>
    </div>
  );
};