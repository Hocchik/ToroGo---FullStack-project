// DriverPage.tsx
import { useState } from "react";
import type { RideRequest } from "./Models";
/* import DriverMap from "../components/DriverMap"; */
import RequestList from "../components/RequestList";
import RideDetails from "../components/RideDetails";
import LoadingOverlay from "../components/LoadingOverlay";

export const DriverPage = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRide, setActiveRide] = useState<RideRequest | null>(null);

  const handleGoOnline = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOnline(true);
    }, 1500);
  };

  const handleAcceptRide = (ride: RideRequest) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveRide(ride);
    }, 1200);
  };

  return (
    <div className="relative w-full h-screen flex overflow-hidden">
      {/* Estado: cargando */}
      {loading && <LoadingOverlay message="Loading..." />}

      {/* Vista de viaje aceptado */}
      {activeRide ? (
        <>
          {/* Left: Ride Details */}
          <div className="w-[350px] bg-white border-r shadow-lg">
            <RideDetails ride={activeRide} />
          </div>

          {/* Right: Map */}
          <div className="flex-1 relative">
            {/* <DriverMap driverLocation={[-77.0428, -12.0464]} requests={[activeRide]} /> */}
          </div>
        </>
      ) : (
        <>
          {/* Left: Sidebar requests */}
          {isOnline && (
            <div className="w-[350px] bg-white border-r shadow-lg">
              <RequestList onAccept={handleAcceptRide} />
            </div>
          )}

          {/* Right: Map with go online */}
          <div className="flex-1 relative">
            {/* <DriverMap driverLocation={[-77.0428, -12.0464]} requests={[]} /> */}

            {!isOnline && !loading && (
              <button
                onClick={handleGoOnline}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
              >
                Buscar viajes
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
