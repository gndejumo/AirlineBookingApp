import "./ManageFlights.css";

function ManageFlights() {
  const sampleFlights = [
    {
      _id: "1",
      flightNumber: "PR101",
      origin: "Manila",
      destination: "Cebu",
      departureDate: "2026-04-10 08:00 AM",
      price: 2500,
      seats: 120,
    },
    {
      _id: "2",
      flightNumber: "5J220",
      origin: "Manila",
      destination: "Davao",
      departureDate: "2026-04-12 01:30 PM",
      price: 3200,
      seats: 95,
    },
    {
      _id: "3",
      flightNumber: "Z2123",
      origin: "Cebu",
      destination: "Clark",
      departureDate: "2026-04-15 06:45 PM",
      price: 2800,
      seats: 110,
    },
  ];

  return (
    <div className="manage-flights-page">
      <div className="manage-flights-container">
        <div className="manage-flights-header">
          <div>
            <h1>Manage Flights</h1>
            <p>View, edit, and organize available flights.</p>
          </div>

          <button className="add-flight-btn">+ Add Flight</button>
        </div>

        <div className="manage-flights-table-wrapper">
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
              {sampleFlights.map((flight) => (
                <tr key={flight._id}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.departureDate}</td>
                  <td>₱ {flight.price}</td>
                  <td>{flight.seats}</td>
                  <td className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageFlights;