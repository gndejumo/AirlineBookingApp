import { useEffect, useState } from "react";
import { getAllFlights } from "../../services/flightService";
import { getMyBookings } from "../../services/bookingService";
import FlightCard from "../../components/FlightCard/FlightCard";
import "./Flights.css";

function Flights() {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightsRes, bookingsRes] = await Promise.all([
          getAllFlights(),
          getMyBookings(),
        ]);

        const allFlights = flightsRes.data.flights || [];
        const myBookings = bookingsRes.data.myBookings || [];

        setFlights(allFlights);
        setBookings(myBookings);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

  // ✅ Available flights
  const availableFlights = flights.filter(
    (f) => new Date(f.departureDate) > now
  );

  // ✅ Admin: all past flights
  const pastFlights = flights.filter(
    (f) => new Date(f.departureDate) <= now
  );

  // ✅ User bookings (past + future)
  const myBookings = bookings;

  if (loading) return <h2 className="status-message">Loading...</h2>;
  if (error) return <h2 className="status-message error">{error}</h2>;

  return (
    <div className="flights-page">
      
      {/* ✈️ AVAILABLE FLIGHTS */}
      <div className="flights-header">
        <h1>Available Flights</h1>
        <p>Choose your next destination.</p>
      </div>

      {availableFlights.length === 0 ? (
        <p className="status-message">No available flights.</p>
      ) : (
        <div className="flights-grid">
          {availableFlights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}

      {/* 📄 BOOKING HISTORY (ALL USERS) */}
      <div className="flights-header">
        <h1>My Bookings</h1>
      </div>

      {myBookings.length === 0 ? (
        <p className="status-message">No bookings found.</p>
      ) : (
        <div className="flights-grid">
          {myBookings.map((booking) => (
            <FlightCard
              key={booking._id}
              flight={booking.flightId}
              passengers={booking.passengers}
              totalPrice={booking.totalPrice}
            />
          ))}
        </div>
      )}

      {/* 👨‍✈️ ADMIN ONLY: FLIGHT HISTORY */}
      {user?.role === "admin" && (
        <>
          <div className="flights-header">
            <h1>All Flight History</h1>
          </div>

          {pastFlights.length === 0 ? (
            <p className="status-message">No past flights.</p>
          ) : (
            <div className="flights-grid">
              {pastFlights.map((flight) => (
                <FlightCard key={flight._id} flight={flight} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Flights;