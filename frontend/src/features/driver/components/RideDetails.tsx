import type { RideRequest } from "../pages/Models";

interface Props {
  ride: RideRequest;
  onCancel: () => void;
  onArrived: () => void;
  onPaid: () => void;
}

export default function RideDetails({ ride, onCancel, onArrived, onPaid }: Props) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Encabezado */}
      <div className="p-4 border-b border-gray-200 text-lg md:text-xl font-bold text-red-700">
        Detalles del viaje
      </div>

      {/* Contenido */}
      <div className="flex-1 p-4 space-y-5 text-gray-800 overflow-y-auto">
        {/* Pasajero */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Pasajero</p>
          <h2 className="text-base md:text-lg font-semibold text-red-800">
            {ride.passenger.name}
          </h2>
          <p className="text-sm text-gray-600">⭐ {ride.passenger.rating.toFixed(1)}</p>
        </div>

        <hr className="border-gray-200" />

        {/* Ruta */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Origen</p>
          <p className="text-base font-medium">{ride.pickup}</p>

          <p className="text-sm text-gray-500 mt-2">Destino</p>
          <p className="text-base font-medium">{ride.drop}</p>
        </div>

        <hr className="border-gray-200" />

        {/* Tarifa */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Tarifa estimada</p>
          <p className="text-xl font-bold text-red-700">S/. {ride.price.toFixed(2)}</p>
        </div>

        <hr className="border-gray-200" />

        {/* Botones de acción */}
        <div className="space-y-2 md:space-y-3 pt-2">
          <button
            onClick={onArrived}
            className="w-full text-sm md:text-base bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            ✅ Confirmar llegada
          </button>

          <button
            onClick={onPaid}
            className="w-full text-sm md:text-base bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition"
          >
            💰 Confirmar pago
          </button>

          <button
            onClick={onCancel}
            className="w-full text-sm md:text-base bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            ❌ Cancelar viaje
          </button>
        </div>
      </div>
    </div>
  );
}