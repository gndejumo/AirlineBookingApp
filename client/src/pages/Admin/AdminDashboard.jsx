import { Link } from "react-router-dom";
import { FaPlaneDeparture, FaClipboardList, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('/admin/dashboard-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">
          Manage flights and monitor airline booking operations.
        </p>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon flights-stat-icon">
              <FaPlaneDeparture />
            </div>
            <div>
              <h3>{stats.totalFlights || 0}</h3>
              <p>Total Flights</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bookings-stat-icon">
              <FaClipboardList />
            </div>
            <div>
              <h3>{stats.totalBookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users-stat-icon">
              <FaUsers />
            </div>
            <div>
              <h3>{stats.totalUsers}</h3>
              <p>Admins:{stats.totalAdmins || 0} | Users: {stats.totalRegularUsers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue-stat-icon">
              <FaMoneyBillWave />
            </div>
            <div>
              <h3>{stats.totalRevenue}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="admin-cards">
          <div className="admin-card">
            <div className="card-icon flights-icon">
              <FaPlaneDeparture />
            </div>
            <h2>Manage Flights</h2>
            <p>
              Add new flights, update existing flights, and remove flights from
              the system.
            </p>
            <Link to="/admin/manage-flights" className="admin-btn">
              Go to Manage Flights
            </Link>
          </div>

          <div className="admin-card">
            <div className="card-icon booking-icon">
              <FaClipboardList />
            </div>
            <h2>Bookings Overview</h2>
            <p>
              Track booking activity and review customer reservations in one
              place.
            </p>
            <Link to="/admin/booking-overview" className="admin-btn booking-btn">
              Go to Booking Overview
            </Link>
          </div>

          <div className="admin-card">
            <div className="card-icon user-icon">
              <FaUsers />
            </div>
            <h2>User Management</h2>
            <p>
              View users and manage admin access for future improvements of the
              system.
            </p>
            <Link to="/admin/user-management" className="admin-btn user-btn">
              Go to User Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;