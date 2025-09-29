import { useEffect, useState } from "react";
import type { RideRequest } from "../pages/Models";

interface Props {
  requests: RideRequest[];
  onAccept: (ride: RideRequest) => void;
  onExpire: (rideId: string) => void;
}

export default function RideNotificationQueue({ requests, onAccept, onExpire }: Props) {
  const [current, setCurrent] = useState<RideRequest | null>(null);
  /* const [queue, setQueue] = useState<RideRequest[]>([]); */

  useEffect(() => {
    if (!current && requests.length > 0) {
      setCurrent(requests[0]);
      /* setQueue(requests.slice(1)); */
    }
  }, [requests, current]);

  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => {
      onExpire(current.id);
      setCurrent(null);
    }, 8000);

    return () => clearTimeout(timer);
  }, [current, onExpire]);

  const handleAccept = () => {
    if (current) {
      onAccept(current);
      setCurrent(null);
    }
  };

  return current ? (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-white border border-red-200 shadow-lg rounded-xl p-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-red-700">{current.passenger.name}</h3>
      <p className="text-sm text-gray-600">⭐ {current.passenger.rating.toFixed(1)}</p>
      <p className="mt-2 text-sm text-gray-700">
        <strong>Origen:</strong> {current.pickup}<br />
        <strong>Destino:</strong> {current.drop}<br />
        <strong>Tarifa:</strong> S/. {current.price.toFixed(2)}
      </p>
      <button
        onClick={handleAccept}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        ✅ Aceptar viaje
      </button>
    </div>
  ) : null;
}