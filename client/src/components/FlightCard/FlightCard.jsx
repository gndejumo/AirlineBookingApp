import "./FlightCard.css";

function FlightCard({ flight }) {
  return (
    <div className="flight-card">
      <h3>{flight.airline || "Airline Name"}</h3>
      <p>
        <strong>{flight.origin}</strong> → <strong>{flight.destination}</strong>
      </p>
      <p>Price: ₱{flight.price}</p>
      <p>Departure: {flight.departureDate ? new Date(flight.departureDate).toLocaleString() : "N/A"}</p>
      <button className="book-btn">View Details</button>
    </div>
  );
}

export default FlightCard;