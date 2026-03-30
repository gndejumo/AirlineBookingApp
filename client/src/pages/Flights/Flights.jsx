import { useEffect, useState } from "react";
import { getAllFlights } from "../../services/flightService";
import FlightCard from "../../components/FlightCard/FlightCard";
import "./Flights.css";

function Flights() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();

        // Safely extract the flights array
        const allFlights = response.data.flights || response.data || [];

        setFlights(allFlights);
      } catch (error) {
        console.error(error);
        setError("Failed to load flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    if (flights.length === 0) return;

    const now = new Date();

    const result = showHistory
      ? flights.filter((flight) => new Date(flight.departureDate) <= now)
      : flights.filter((flight) => new Date(flight.departureDate) > now);

    setFilteredFlights(result);
  }, [flights, showHistory]);

  if (loading) return <h2 className="status-message">Loading flights...</h2>;
  if (error) return <h2 className="status-message error">{error}</h2>;

  return (
    <div className="flights-page">
      <div className="flights-header">
        <h1>{showHistory ? "Flight History" : "Available Flights"}</h1>
        <p>
          {showHistory
            ? "See all departed flights."
            : "Choose your next destination."}
        </p>

        {/* Toggle Buttons */}
        <div className="flights-toggle">
          <button
            className={!showHistory ? "active-toggle" : ""}
            onClick={() => setShowHistory(false)}
          >
            Available Flights
          </button>
          <button
            className={showHistory ? "active-toggle" : ""}
            onClick={() => setShowHistory(true)}
          >
            Flight History
          </button>
        </div>
      </div>

      {filteredFlights.length === 0 ? (
        <p className="status-message">
          {showHistory
            ? "No departed flights found."
            : "No available flights right now."}
        </p>
      ) : (
        <div className="flights-grid">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Flights;
