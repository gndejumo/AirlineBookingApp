  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { getFlightById } from "../../services/flightService";
  import api from "../../services/api";
  import "./BookFlight.css";

  function BookFlight() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [flight, setFlight] = useState(null);
    const [passengers, setPassengers] = useState(1);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Fetch flight details
    useEffect(() => {
      const fetchFlight = async () => {
        try {
          const response = await getFlightById(id);
          setFlight(response.data.flight || response.data);
        } catch (error) {
          console.error(error);
          setMessage("Failed to load flight");
        } finally {
          setLoading(false);
        }
      };

      fetchFlight();
    }, [id]);

    // Calculate total price
    const totalPrice = flight ? passengers * flight.price : 0;

    // Submit booking
    const handleBooking = async (e) => {
      e.preventDefault();

      try {
        await api.post("/bookings", {
          flightId: id,
          passengers,
          totalPrice,
        });

        setMessage("Booking successful!");

        // Redirect after success
        setTimeout(() => {
          navigate("/profile");
        }, 1500);

      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.message || "Booking failed"
        );
      }
    };

    if (loading) return <h2>Loading flight...</h2>;
    if (!flight) return <h2>Flight not found</h2>;

    return (
      <div className="book-flight-page">
        <div className="book-flight-card">
          <h1>Book Flight</h1>

          {message && <p className="message">{message}</p>}

          <div className="flight-summary">
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Route:</strong> {flight.origin} → {flight.destination}</p>
            <p><strong>Price per passenger:</strong> ₱{flight.price}</p>
          </div>

          <form onSubmit={handleBooking} className="booking-form">
            <label>Number of Passengers</label>
            <input
              type="number"
              min="1"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              required
            />

            <p className="total-price">
              Total Price: ₱{totalPrice}
            </p>

            <button type="submit" className="book-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default BookFlight;