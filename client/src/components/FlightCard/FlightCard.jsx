import { Link } from "react-router-dom";
import "./FlightCard.css";

function FlightCard({ flight }) {
  const formatDateTime = (dateValue) => {
    if (!dateValue) return "N/A";

    return new Date(dateValue).toLocaleString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flight-card">
      <h3>{flight.airline || "Airline"}</h3>

      <p>
        <strong>{flight.origin}</strong> → <strong>{flight.destination}</strong>
      </p>

      <p>Price: ₱{flight.price}</p>
      <p>Departure: {formatDateTime(flight.departureDate)}</p>
      <p>Arrival: {formatDateTime(flight.arrivalDate)}</p>

      <Link to={`/flights/${flight._id}`} className="details-btn">
        View Details
      </Link>
    </div>
  );
}

export default FlightCard;