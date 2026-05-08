import { useState } from "react";
import "./FlightCard.css";
import { bookFlight } from "../../services/bookingService";
import Swal from "sweetalert2";
import indiaImg from "../../images/india.jpg";
import koreaImg from "../../images/korea.jpg";
import davaoImg from "../../images/davao.jpg";
import japanImg from "../../images/japan.jpg";
import cebuImg from "../../images/cebu.jpg";
import indoImg from "../../images/indonesia.jpg";
import mnlImg from "../../images/manila.jpg";
import tokyoImg from "../../images/tokyo.jpg";
import minImg from "../../images/mindoro.jpg";
import batImg from "../../images/batanes.jpg";
import cagImg from "../../images/cagayan.jpg";

// Helper: format time as HH:MM from a date string
function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

// Helper: format date nicely
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString([], {
    month: "short", day: "numeric", year: "numeric",
  });
}

// Helper: compute flight duration string
function getDuration(dep, arr) {
  const diff = new Date(arr) - new Date(dep);
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hrs <= 0 && mins <= 0) return "";
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

function FlightCard({ flight }) {
  const [open, setOpen] = useState(false);

  const departureDate = new Date(flight.departureDate);
  const now = new Date();
  const hasDeparted = departureDate.getTime() <= now.getTime();

  const depTime = formatTime(flight.departureDate);
  const arrTime = formatTime(flight.arrivalDate);
  const duration = getDuration(flight.departureDate, flight.arrivalDate);

  // Use first 3 letters of city as pseudo-IATA if no iata field
  const originCode = flight.originCode || flight.origin?.slice(0, 3).toUpperCase() || "ORG";
  const destCode   = flight.destinationCode || flight.destination?.slice(0, 3).toUpperCase() || "DST";

  const handleBookNow = async () => {
    try {
      const payload = { flightId: flight._id, passengers: 1 };
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
        text: "Please Login" || "Something went wrong while booking this flight.",
      });
    }
  };

  const destinationImages = {
  india: indiaImg,
  korea: koreaImg,
  davao: davaoImg,
  japan: japanImg,
  cebu: cebuImg,
  indonesia: indoImg,
  manila: mnlImg,
  tokyo: tokyoImg,
  mindoro: minImg,
  batanes: batImg,
  cagayan: cagImg
  };

  const bgImage = destinationImages[flight.destination?.toLowerCase()] || null;

  return (
    <>
      {/* ===== Flight Card ===== */}
      <div className="flight-card" onClick={() => setOpen(true)}>
        {/* Background gradient */}
            <div
            className="fc-bg"
            style={bgImage ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            } : {}}
          />

        {/* Bottom gradient overlay */}
        <div className="fc-overlay" />

        {/* Top-left corner: origin only */}
        <div className="fc-corner tl">
          <span className="fc-corner-code">{originCode}</span>
          <span className="fc-corner-label">Origin</span>
        </div>

        {/* Watermark plane emoji */}
        <div className="fc-watermark">✈</div>

        {/* Bottom info panel */}
        <div className="fc-body">

          {/* Flight number + seats */}
          <div className="fc-meta">
            <span>{flight.flightNumber}</span>
            <span>{flight.seats} seats</span>
          </div>

          {/* Route row */}
          <div className="fc-route">
            <div className="fc-point">
              <span className="fc-time">{depTime}</span>
              <span className="fc-iata">{originCode}</span>
            </div>

            <div className="fc-mid">
              {duration && <span className="fc-dur">{duration}</span>}
              <div className="fc-dash" />
              <span className="fc-plane">✈</span>
            </div>

            <div className="fc-point fc-point-right">
              <span className="fc-time">{arrTime}</span>
              <span className="fc-iata">{destCode}</span>
            </div>
          </div>

          <div className="fc-divider" />

          {/* Footer: date + price */}
          <div className="fc-footer">
            <div className="fc-col">
              <span className="fc-flbl">Date</span>
              <span className="fc-fval">{formatDate(flight.departureDate)}</span>
            </div>
            <div className="fc-col">
              <span className="fc-flbl">Airline</span>
              <span className="fc-fval">{flight.airline || flight.flightNumber?.slice(0, 3) || "—"}</span>
            </div>
            <div className="fc-price">₱{flight.price?.toLocaleString()}</div>
          </div>

          <button className="view-btn" onClick={(e) => { e.stopPropagation(); setOpen(true); }}>
            View Details
          </button>

        </div>
      </div>

      {/* ===== Modal ===== */}
      {open && (
        <div className="flight-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="flight-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Flight Details</h2>
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Origin:</strong> {flight.origin}</p>
            <p><strong>Destination:</strong> {flight.destination}</p>
            <p><strong>Departure:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(flight.arrivalDate).toLocaleString()}</p>
            <p><strong>Price:</strong> ₱{flight.price?.toLocaleString()}</p>
            <p><strong>Seats:</strong> {flight.seats}</p>

            <div className="modal-actions">
              {!hasDeparted && (
                <button className="book-btn" onClick={handleBookNow}>
                  Book Now
                </button>
              )}
              <button className="close-modal" onClick={() => setOpen(false)}>
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
