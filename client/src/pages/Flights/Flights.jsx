import { useEffect, useState } from "react";
import { getAllFlights } from "../../services/flightService";
import FlightCard from "../../components/FlightCard/FlightCard";
import "./Flights.css";

function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();
        setFlights(response.data.flights || response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <h2 className="status-message">Loading flights...</h2>;
  if (error) return <h2 className="status-message error">{error}</h2>;

  return (
    <div className="flights-page">
      <div className="flights-header">
        <h1>Available Flights</h1>
        <p>Choose your destination and book your next trip.</p>
      </div>

      {flights.length === 0 ? (
        <p className="status-message">No flights available.</p>
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

export default Flights;