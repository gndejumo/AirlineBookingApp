import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFlightById } from "../../services/flightService";
import "./FlightDetails.css";

function FlightDetails() {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await getFlightById(id);
        setFlight(response.data.flight || response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load flight details");
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) return <h2>Loading flight details...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!flight) return <h2>Flight not found.</h2>;

  return (
    <div className="flight-details-page">
      <div className="flight-details-card">
        <h1>{flight.airline || "Airline"}</h1>
        <p>
          <strong>Route:</strong> {flight.origin} → {flight.destination}
        </p>
        <p>
          <strong>Price:</strong> ₱{flight.price}
        </p>
        <p>
          <strong>Departure:</strong>{" "}
          {flight.departureDate
            ? new Date(flight.departureDate).toLocaleString()
            : "N/A"}
        </p>
        <p>
          <strong>Arrival:</strong>{" "}
          {flight.arrivalDate
            ? new Date(flight.arrivalDate).toLocaleString()
            : "N/A"}
        </p>
        <p>
          <strong>Seats:</strong> {flight.seats ?? "N/A"}
        </p>

        <div className="flight-details-actions">
          <Link to="/flights" className="back-btn">
            Back to Flights
          </Link>
          <Link to={`/book-flight/${flight._id}`} className="book-btn">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FlightDetails;