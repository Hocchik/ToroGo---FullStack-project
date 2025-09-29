import type { RideRequest } from "../pages/Models";

interface Props {
  requests: RideRequest[];
  onAccept: (ride: RideRequest) => void;
  onStopSearch: () => void;
}

export default function RequestList({ requests, onAccept, onStopSearch }: Props) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 text-lg md:text-xl font-bold text-red-700 flex justify-between items-center">
        <span>Solicitudes</span>
        <button
          onClick={onStopSearch}
          className="text-xs md:text-sm bg-red-600 text-white px-2 md:px-3 py-1 rounded hover:bg-red-700 transition"
        >
          🛑 Parar búsqueda
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay solicitudes activas.</p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="p-4 bg-red-50 border border-red-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-base md:text-lg font-semibold text-red-800">
                  {req.passenger.name}
                </h3>
                <span className="text-sm text-gray-500">
                  ⭐ {req.passenger.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p><span className="font-medium text-gray-800">Origen:</span> {req.pickup}</p>
                <p><span className="font-medium text-gray-800">Destino:</span> {req.drop}</p>
                <p><span className="font-medium text-gray-800">Tarifa:</span> S/. {req.price.toFixed(2)}</p>
              </div>

              <button
                onClick={() => onAccept(req)}
                className="mt-4 w-full bg-green-600 text-white text-sm md:text-base py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                ✅ Aceptar viaje
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}