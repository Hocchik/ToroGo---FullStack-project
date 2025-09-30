import { useCallback, useState } from "react";
import type { RideRequest } from "./Models";
import RequestList from "../components/RequestList";
import RideDetails from "../components/RideDetails";
import LoadingOverlay from "../components/LoadingOverlay";
import RideNotificationQueue from "../components/RideNotificationQueue";
import SlidingSidebar from "../components/SlidingSideBar";

const dummyRequests: RideRequest[] = [
  {
    id: "1",
    pickup: "Main Street",
    drop: "Park Avenue",
    price: 12.5,
    passenger: { id: "p1", name: "Carlos López", rating: 4.8 },
  },
  {
    id: "2",
    pickup: "Airport",
    drop: "Downtown",
    price: 20,
    passenger: { id: "p2", name: "María Torres", rating: 4.9 },
  },
];

export const DriverPage = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRide, setActiveRide] = useState<RideRequest | null>(null);
  const [pendingRequests, setPendingRequests] = useState<RideRequest[]>([]);
  const [expiredRequests, setExpiredRequests] = useState<RideRequest[]>([]);
  const [requestPanelOpen, setRequestPanelOpen] = useState(false);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);

  const handleGoOnline = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOnline(true);
      setPendingRequests(dummyRequests);
    }, 1500);
  };

  const handleStopSearch = () => {
    setIsOnline(false);
    setPendingRequests([]);
    setExpiredRequests([]);
    setRequestPanelOpen(false);
  };

  const handleAcceptRide = (ride: RideRequest) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveRide(ride);
      setPendingRequests([]);
      setExpiredRequests([]);
      setRequestPanelOpen(false);
    }, 1200);
  };

  const handleCancelRide = () => {
    setActiveRide(null);
    setDetailsPanelOpen(false);
    setIsOnline(false);
  };

  const handleConfirmArrival = () => {
    alert("Conductor ha confirmado llegada.");
  };

  const handleConfirmPayment = () => {
    alert("Pago confirmado.");
    setActiveRide(null);
    setDetailsPanelOpen(false);
    setIsOnline(false);
  };

  const handleExpire = useCallback(
    (id: string) => {
      const expired = pendingRequests.find((r) => r.id === id);
      if (expired) setExpiredRequests((prev) => [...prev, expired]);
      setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    },
    [pendingRequests]
  );

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-100 to-white" />

      <div className="relative z-10 flex flex-col md:flex-row h-full max-h-screen overflow-y-auto">
        {loading && <LoadingOverlay message="Cargando..." />}

        {/* Panel de solicitudes */}
        <SlidingSidebar open={requestPanelOpen} onClose={() => setRequestPanelOpen(false)} title="Solicitudes">
          <RequestList
            requests={expiredRequests}
            onAccept={handleAcceptRide}
            onStopSearch={handleStopSearch}
          />
        </SlidingSidebar>

        {/* Panel de detalles del viaje */}
        <SlidingSidebar open={detailsPanelOpen} onClose={() => setDetailsPanelOpen(false)} title="Detalle del viaje">
          {activeRide && (
            <RideDetails
              ride={activeRide}
              onCancel={handleCancelRide}
              onArrived={handleConfirmArrival}
              onPaid={handleConfirmPayment}
            />
          )}
        </SlidingSidebar>

        {/* Mapa y botones de menú */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="text-gray-400 text-sm">🗺 Mapa en desarrollo</div>

          {/* Botón para abrir solicitudes */}
          {isOnline && !activeRide && !requestPanelOpen && (
            <button
              onClick={() => setRequestPanelOpen(true)}
              className="absolute top-4 left-4 z-50 bg-white text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100 transition"
            >
              <span className="text-2xl font-bold">≡</span>
            </button>
          )}

          {/* Botón para abrir detalles */}
          {activeRide && !detailsPanelOpen && (
            <button
              onClick={() => setDetailsPanelOpen(true)}
              className="absolute top-4 left-4 z-50 bg-white text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100 transition"
            >
              <span className="text-2xl font-bold">≡</span>
            </button>
          )}
        </div>

        {/* Cola de notificaciones */}
        {isOnline && !activeRide && (
          <RideNotificationQueue
            requests={pendingRequests}
            onAccept={handleAcceptRide}
            onExpire={handleExpire}
          />
        )}

        {/* Pantalla inicial */}
        {!isOnline && !activeRide && !loading && (
          <div className="flex-1 relative flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">¿Listo para recibir viajes?</h2>
              <p className="text-sm text-gray-500">
                Pulsa el botón para comenzar a buscar solicitudes cercanas.
              </p>
              <button
                onClick={handleGoOnline}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out"
              >
                🚀 Buscar viajes
              </button>
            </div>
          </div>
        )}
      </div>
   </div>
  );
};