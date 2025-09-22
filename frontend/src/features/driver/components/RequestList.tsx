import type { RideRequest } from "../pages/Models";

interface Props {
  onAccept: (ride: RideRequest) => void;
}

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

export default function RequestList({ onAccept }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b font-semibold text-lg">Requests</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {dummyRequests.map((req) => (
          <div
            key={req.id}
            className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold">{req.passenger.name}</h3>
            <p className="text-sm text-gray-600">Pickup: {req.pickup}</p>
            <p className="text-sm text-gray-600">Drop: {req.drop}</p>
            <p className="text-sm text-gray-800 font-medium">
              ${req.price.toFixed(2)}
            </p>
            <button
              onClick={() => onAccept(req)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
