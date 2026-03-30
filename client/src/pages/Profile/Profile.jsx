import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProfileAndBookings = async () => {
    try {
      const profileRes = await api.get("/auth/profile");
      const userData = profileRes.data.user || profileRes.data;

      setProfile(userData);

      const userId = userData._id || userData.id;
      const bookingsRes = await api.get(`/users/bookings/${userId}`);
      setBookings(bookingsRes.data.bookings || bookingsRes.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndBookings();
  }, []);

  // 🔥 Flight Status Logic
const getFlightStatus = (departureDate, status) => {
  if (status === "cancelled") return "Cancelled";
  if (!departureDate) return "No departure info";
  const now = new Date();
  const departure = new Date(departureDate);
  if (isNaN(departure.getTime())) return "Invalid date";
  const diff = departure - now;
  if (diff <= 0) return "Departed";
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) {
    return `Flight in ${days}d ${hours}h`;
  } else if (hours > 0) {
    return `Flight in ${hours}h ${minutes}m`;
  } else {
    return `Flight in ${minutes} mins`;
  }
};

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.patch(`/users/bookings/${bookingId}/cancel`);
      setMessage("Booking cancelled successfully");

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return <h2 className="profile-status">Loading profile...</h2>;
  }

const handleDeleteBooking = async (bookingId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/users/bookings/${bookingId}/delete`);
    setMessage("Booking deleted successfully");

    setBookings((prev) =>
      prev.filter((booking) => booking._id !== bookingId)
    );
  } catch (error) {
    console.error(error);
    setMessage("Failed to delete booking");
  }
};

  return (
    <div className="profile-page">
      {/* PROFILE CARD */}
      <div className="profile-card">
        <h1>My Profile</h1>

        {message && <p className="profile-message">{message}</p>}

        <div className="profile-info">
          <p><strong>First Name:</strong> {profile?.firstName || "N/A"}</p>
          <p><strong>Last Name:</strong> {profile?.lastName || "N/A"}</p>
          <p><strong>Email:</strong> {profile?.email || "N/A"}</p>
          <p><strong>Role:</strong> {profile?.role || "user"}</p>
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="bookings-section">
        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="empty-state">
            ✈️ You have no bookings yet. Book your first flight!
          </p>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => {
              const flight = booking.flightId;

              return (
                <div key={booking._id} className="booking-card">
                  <h3>
                    {flight?.origin || "N/A"} → {flight?.destination || "N/A"}
                  </h3>

                  <p>
                    <strong>Departure:</strong>{" "}
                    {flight?.departureDate 
                      ? new Date(flight.departureDate).toLocaleString()
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Passengers:</strong> {booking.passengers}
                  </p>

                  <p>
                    <strong>Total:</strong> ₱{booking.totalPrice}
                  </p>

                  {/* 🔥 Dynamic Status */}
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`status ${
                        booking.status  === "cancelled"
                          ? "cancelled"
                          : "active"
                      }`}
                    >
                      {getFlightStatus(
                        flight?.departureDate,
                        booking.status
                      )}
                    </span>
                  </p>

                  <p className="booking-date">
                    Booked on:{" "}
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleString()
                      : "N/A"}
                  </p>

                  <div className="booking-actions">
                    {booking.status !== "cancelled" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;