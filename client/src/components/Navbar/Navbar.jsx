import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">LesGoPH</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/flights">Flights</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            {/* show if admin user  */}
            {user.role === "admin" && ( 
              <>
              <Link to= "/admin">Dashboard</Link>
              <Link to="/admin/manage-flights">Manage Flights</Link>
              </>
            )}
            <button className = "logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;