import { useState } from "react";
import "./FlightCard.css";
import { bookFlight } from "../../services/bookingService";
import Swal from "sweetalert2";

function FlightCard({ flight }) {
  const [open, setOpen] = useState(false);

  // Determine whether flight has already departed
  const departureDate = new Date(flight.departureDate);
  const now = new Date();
  const hasDeparted = departureDate.getTime() <= now.getTime();

  // Handle booking logic
  const handleBookNow = async () => {
    try {
      const payload = {
        flightId: flight._id,
        passengers: 1, // default to one passenger (can be adjusted later)
      };

      const response = await bookFlight(payload);

      Swal.fire({
        icon: "success",
        title: "Booking Successful",
        text: `Your booking for flight ${flight.flightNumber} was successful!`,
        confirmButtonColor: "#007bff",
      });

      setOpen(false);
      console.log("Booking created:", response.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text:
          "Please Login" ||
          "Something went wrong while booking this flight.",
      });
    }
  };

  return (
    <>
      {/* ===== Flight Card ===== */}
      <div className="flight-card">
        <div className="flight-card-header">
          <h3>
            {flight.origin} → {flight.destination}
          </h3>
          <p className="flight-number">Flight No: {flight.flightNumber}</p>
        </div>

        <div className="flight-details">
          <p>
            <strong>Price:</strong> ₱{flight.price}
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {new Date(flight.departureDate).toLocaleString()}
          </p>
          <p>
            <strong>Arrival:</strong>{" "}
            {new Date(flight.arrivalDate).toLocaleString()}
          </p>
        </div>

        <div className="flight-card-footer">
          <button className="view-btn" onClick={() => setOpen(true)}>
            View Details
          </button>
        </div>
      </div>

      {/* ===== Modal ===== */}
      {open && (
        <div className="flight-modal-backdrop" onClick={() => setOpen(false)}>
          <div
            className="flight-modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2>Flight Details</h2>

            <p>
              <strong>Flight Number:</strong> {flight.flightNumber}
            </p>
            <p>
              <strong>Origin:</strong> {flight.origin}
            </p>
            <p>
              <strong>Destination:</strong> {flight.destination}
            </p>
            <p>
              <strong>Departure:</strong>{" "}
              {new Date(flight.departureDate).toLocaleString()}
            </p>
            <p>
              <strong>Arrival:</strong>{" "}
              {new Date(flight.arrivalDate).toLocaleString()}
            </p>
            <p>
              <strong>Price:</strong> ₱{flight.price}
            </p>
            <p>
              <strong>Seats:</strong> {flight.seats}
            </p>

            <div className="modal-actions">
              {/* Show Book Now only if the flight has NOT departed */}
              {!hasDeparted && (
                <button className="book-btn" onClick={handleBookNow}>
                  Book Now
                </button>
              )}
              <button
                className="close-modal"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FlightCard;
