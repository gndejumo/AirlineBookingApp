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

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>

        {message && <p className="profile-message">{message}</p>}

        <div className="profile-info">
          <p>
            <strong>First Name:</strong> {profile?.firstName || "N/A"}
          </p>
          <p>
            <strong>Last Name:</strong> {profile?.lastName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {profile?.email || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {profile?.role || "user"}
          </p>
        </div>
      </div>

      <div className="bookings-section">
        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="profile-status">No bookings found.</p>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <p>
                  <strong>Flight ID:</strong>{" "}
                  {booking.flightId?._id || booking.flightId || "N/A"}
                </p>
                <p>
                  <strong>Passengers:</strong> {booking.passengers}
                </p>
                <p>
                  <strong>Total Price:</strong> ₱{booking.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      booking.status === "cancelled"
                        ? "status-cancelled"
                        : "status-confirmed"
                    }
                  >
                    {booking.status}
                  </span>
                </p>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {booking.bookingDate
                    ? new Date(booking.bookingDate).toLocaleString()
                    : "N/A"}
                </p>

                {booking.status !== "cancelled" && (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;