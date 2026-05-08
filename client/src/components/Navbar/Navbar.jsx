import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);
  const isActive = (path) => location.pathname === path ? "active" : "";

  const links = (
    <>
      <Link to="/" className={isActive("/")} onClick={closeMenu}>Home</Link>
      <Link to="/flights" className={isActive("/flights")} onClick={closeMenu}>Flights</Link>

      {!user ? (
        <>
          <Link to="/login" className={isActive("/login")} onClick={closeMenu}>Login</Link>
          <Link to="/register" className={isActive("/register")} onClick={closeMenu}>Register</Link>
        </>
      ) : (
        <>
          <Link to="/profile" className={isActive("/profile")} onClick={closeMenu}>Profile</Link>
          {user.role === "admin" && (
            <>
              <Link to="/admin" className={isActive("/admin")} onClick={closeMenu}>Dashboard</Link>
              <Link to="/admin/manage-flights" className={isActive("/admin/manage-flights")} onClick={closeMenu}>Manage Flights</Link>
            </>
          )}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>LesGoPH</Link>
        </div>

        {/* Desktop links */}
        <div className="navbar-links">
          {links}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {links}
        </div>
      )}
    </>
  );
}

export default Navbar;
