import { useEffect, useState } from "react";
import { getAllFlights } from "../../services/flightService";
import FlightCard from "../../components/FlightCard/FlightCard";
import "./Flights.css"; // reuse the same styling

function FlightsHistory() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();

        // Safely extract flights array
        const allFlights = response.data.flights || response.data;

        const now = new Date();
        const pastFlights = allFlights.filter(
          (flight) => new Date(flight.departureDate) <= now
        );

        setFlights(pastFlights);
      } catch (error) {
        console.error(error);
        setError("Failed to load flight history");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <h2 className="status-message">Loading flight history...</h2>;
  if (error) return <h2 className="status-message error">{error}</h2>;

  return (
    <div className="flights-page">
      <div className="flights-header">
        <h1>Flight  </h1>
        <p>List of departed flights.</p>
      </div>

      {flights.length === 0 ? (
        <p className="status-message">No departed flights to show.</p>
      ) : (
        <div className="flights-grid">
          {flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightsHistory;
