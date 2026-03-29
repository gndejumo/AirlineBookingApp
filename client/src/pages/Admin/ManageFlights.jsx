import { useEffect, useState } from "react";
import "./ManageFlights.css";
import {
  getAllFlights,
  createFlight,
  updateFlight,
  deleteFlight,
} from "../../services/flightService";

function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);

  const [formData, setFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    price: "",
    seats: "",
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await getAllFlights();
      setFlights(response.data.flights || []);
      
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      flightNumber: "",
      origin: "",
      destination: "",
      departureDate: "",
      arrivalDate: "",
      price: "",
      seats: "",
    });
    setEditingFlightId(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    resetForm();
    setShowForm(true);
  };

const handleEditClick = (flight) => {
  setEditingFlightId(flight._id);

  setFormData({
    flightNumber: flight.flightNumber || "",
    origin: flight.origin || "",
    destination: flight.destination || "",
    departureDate: formatDateTimeLocal(flight.departureDate),
    arrivalDate: formatDateTimeLocal(flight.arrivalDate),
    price: flight.price || "",
    seats: flight.seats || "",
  });

  setShowForm(true);

  // 👉 scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        seats: Number(formData.seats),
      };

      if (editingFlightId) {
        await updateFlight(editingFlightId, payload);
        alert("Flight updated successfully");
      } else {
        await createFlight(payload);
        alert("Flight added successfully");
      }

      resetForm();
      fetchFlights();
    } catch (error) {
      console.error("Error saving flight:", error);
      alert(error.response?.data?.message || "Failed to save flight");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flight?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFlight(id);
      alert("Flight deleted successfully");
      fetchFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
      alert(error.response?.data?.message || "Failed to delete flight");
    }
  };

  return (
    <div className="manage-flights-page">
      <div className="manage-flights-container">
        <div className="manage-flights-header">
          <div>
            <h1>Manage Flights</h1>
            <p>View, edit, and organize available flights.</p>
          </div>

          <button className="add-flight-btn" onClick={handleAddClick}>
            + Add Flight
          </button>
        </div>

        {showForm && (
          <div className="flight-form-card">
            <h2>{editingFlightId ? "Edit Flight" : "Add New Flight"}</h2>

            <form className="flight-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="flightNumber"
                placeholder="Flight Number"
                value={formData.flightNumber}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="origin"
                placeholder="Origin"
                value={formData.origin}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />

              <input
                type="datetime-local"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
              />

              <input
                type="datetime-local"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="seats"
                placeholder="Seats"
                value={formData.seats}
                onChange={handleChange}
                required
              />

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingFlightId ? "Update Flight" : "Save Flight"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="manage-flights-table-wrapper">
          {loading ? (
            <p className="loading-text">Loading flights...</p>
          ) : flights.length === 0 ? (
            <p className="empty-text">No flights available.</p>
          ) : (
            <table className="manage-flights-table">
              <thead>
                <tr>
                  <th>Flight No.</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Departure</th>
                  <th>Price</th>
                  <th>Seats</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {flights.map((flight) => (
                  <tr key={flight._id}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                    <td>{formatDate(flight.departureDate)}</td>
                    <td>₱ {flight.price}</td>
                    <td>{flight.seats}</td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(flight)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(flight._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageFlights;