import { useEffect, useState } from "react";
import "./BookingOverview.css";
import { getAllBookings, cancelBookingAdmin } from "../../services/adminService";

function BookingOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getAllBookings();
      // Debug: inspect one booking to verify populated fields
      console.log("Sample booking:", res.data.bookings?.[0]);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDateTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const groupByUser = (list) => {
    return list.reduce((acc, booking) => {
      const userId = booking.userId?._id;
      if (!userId) return acc;

      if (!acc[userId]) {
        acc[userId] = {
          user: booking.userId,
          bookings: [],
        };
      }

      acc[userId].bookings.push(booking);
      return acc;
    }, {});
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    try {
      await cancelBookingAdmin(id);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // Uses Flight.departureDate and Flight.arrivalDate from your Flight schema
  const getFlightInfoText = (booking) => {
    const flight = booking.flightId;

    if (!flight) return "No flight data";

    // If flightId is still just an ObjectId string -> backend is not populating it
    if (typeof flight === "string") {
      return "Flight not populated (add populate('flightId'))";
    }

    const departure = flight.departureDate;
    const arrival = flight.arrivalDate;

    if (departure && arrival) {
      const start = new Date(departure);
      const end = new Date(arrival);
      const diffMinutes = (end - start) / (1000 * 60);
      const hours = Math.floor(diffMinutes / 60);
      const mins = Math.round(diffMinutes % 60);
      return `✈ ${hours}h ${mins}m`;
    }

    if (departure) return `Departure: ${formatDateTime(departure)}`;
    if (arrival) return `Arrival: ${formatDateTime(arrival)}`;

    return "Schedule not set";
  };

  const grouped = groupByUser(bookings);

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Bookings Overview</h1>
        <p className="booking-subtitle">
          Monitor all customer reservations and booking activity.
        </p>

        {loading ? (
          <p className="loading-text">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="empty-text">No bookings found.</p>
        ) : (
          <div className="table-wrapper">
            {Object.values(grouped).map((group) => (
              <div key={group.user._id} className="user-booking-group">
                <h3 className="user-title">
                  {group.user.firstName} {group.user.lastName}
                </h3>

                <table className="booking-table">
                  <thead>
                    <tr>
                      <th>Flight</th>
                      <th>Date Booked</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.bookings.map((b) => (
                      <tr key={b._id} className="booking-row">
                        {/* FLIGHT COLUMN */}
                        <td>
                          <div className="booking-header">
                            <div>
                              <h2>{b.flightId?.origin}</h2>
                              <p className="small-text">
                                Flight #{b.flightId?.flightNumber}
                              </p>
                            </div>

                            <div className="booking-middle">
                              <span className="duration">
                                {getFlightInfoText(b)}
                              </span>
                            </div>

                            <div>
                              <h2>{b.flightId?.destination}</h2>
                            </div>
                          </div>
                        </td>

                        {/* DATE BOOKED COLUMN (Booking.bookingDate) */}
                        <td>
                          <div className="detail-item">
                            <p className="detail-value">
                              {formatDateTime(b.bookingDate)}
                            </p>
                          </div>
                        </td>

                        {/* STATUS COLUMN */}
                        <td>
                          <div className="detail-item">
                            <span className={`status-badge ${b.status}`}>
                              {b.status}
                            </span>
                          </div>
                        </td>

                        {/* PRICE COLUMN (Booking.totalPrice) */}
                        <td>
                          <div className="detail-item">
                            <p className="price">
                              ₱{" "}
                              {Number(b.totalPrice || 0).toLocaleString("en-PH")}
                            </p>
                            <p className="small-text">
                              {b.passengers} passenger
                              {b.passengers > 1 ? "s" : ""}
                            </p>
                          </div>
                        </td>

                        {/* ACTION COLUMN */}
                        <td>
                          <div className="booking-actions">
                            {b.status === "confirmed" ? (
                              <button
                                className="cancel-btn"
                                onClick={() => handleCancel(b._id)}
                              >
                                Cancel
                              </button>
                            ) : (
                              <button className="cancel-btn" disabled>
                                Cancelled
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingOverview;