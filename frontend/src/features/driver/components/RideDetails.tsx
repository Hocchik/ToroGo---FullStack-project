import type { RideRequest } from "../pages/Models";

interface Props {
  ride: RideRequest;
}

export default function RideDetails({ ride }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b font-semibold text-lg">Ride Details</div>
      <div className="flex-1 p-4 space-y-3">
        <p><strong>Passenger:</strong> {ride.passenger.name}</p>
        <p><strong>Rating:</strong> ⭐ {ride.passenger.rating}</p>
        <p><strong>Pickup:</strong> {ride.pickup}</p>
        <p><strong>Drop:</strong> {ride.drop}</p>
        <p><strong>Price:</strong> ${ride.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
