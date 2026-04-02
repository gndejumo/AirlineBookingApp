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
  const [activeTab, setActiveTab] = useState("available"); // available, bookings, history
  const [userRole, setUserRole] = useState("user"); // default

  useEffect(() => {
    const fetchUserAndData = async () => {
      try {
        // 1️⃣ Get all flights
        const flightsRes = await getAllFlights();
        const allFlights = flightsRes.data.flights || flightsRes.data || [];
        setFlights(allFlights);

        // 2️⃣ Get user bookings
        const bookingsRes = await getMyBookings();
        setBookings(bookingsRes.data.myBookings || []);

        // 3️⃣ Get user role from session
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user?.role) setUserRole(user.role);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndData();
  }, []);

  if (loading) return <h2 className="status-message">Loading...</h2>;
  if (error) return <h2 className="status-message error">{error}</h2>;

  // Filter flights based on past/future
  const now = new Date();
  const availableFlights = flights.filter(
    (f) => new Date(f.departureDate) > now
  );
  const pastFlights = flights.filter((f) => new Date(f.departureDate) <= now);

  return (
    <div className="flights-page">
      <div className="flights-header">
        <h1>
          {activeTab === "available"
            ? "Available Flights"
            : activeTab === "bookings"
            ? "My Bookings"
            : "Flight History"}
        </h1>
        <p>
          {activeTab === "available"
            ? "Choose your next destination."
            : activeTab === "bookings"
            ? "View your booked flights."
            : "See all departed flights."}
        </p>

        {/* Toggle Buttons */}
        <div className="flights-toggle">
          <button
            className={activeTab === "available" ? "active-toggle" : ""}
            onClick={() => setActiveTab("available")}
          >
            Available Flights
          </button>

          <button
            className={activeTab === "bookings" ? "active-toggle" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings History
          </button>

          {userRole === "admin" && (
            <button
              className={activeTab === "history" ? "active-toggle" : ""}
              onClick={() => setActiveTab("history")}
            >
              Flight History
            </button>
          )}
        </div>
      </div>

      {/* Display content based on active tab */}
      {activeTab === "available" && (
        <div className="flights-grid">
          {availableFlights.length === 0 ? (
            <p className="status-message">No available flights right now.</p>
          ) : (
            availableFlights.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))
          )}
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="flights-grid">
          {bookings.length === 0 ? (
            <p className="status-message">No bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <FlightCard
                key={booking._id}
                flight={booking.flightId}
                passengers={booking.passengers}
                totalPrice={booking.totalPrice}
              />
            ))
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className="flights-grid">
          {pastFlights.length === 0 ? (
            <p className="status-message">No past flights.</p>
          ) : (
            pastFlights.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Flights;