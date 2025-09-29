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
            <div className="absolute inset-0 -z-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.123456789!2d-77.042793!3d-12.046374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c123456789%3A0xabcdef123456789!2sAv.%20Emancipaci%C3%B3n%20202!5e0!3m2!1ses!2spe!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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
            <div className="absolute inset-0 -z-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.123456789!2d-77.042793!3d-12.046374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c123456789%3A0xabcdef123456789!2sAv.%20Emancipaci%C3%B3n%20202!5e0!3m2!1ses!2spe!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

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
