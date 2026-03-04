const Header = () => {
  const companyName = 'EtherGate Flights';

  return (
    <header className="navbar">
      <h1 className="logo">{companyName}</h1>

      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/flights">Flights</a>
        <a href="/bookings">MyBookings</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/contact">Contact Us</a>
      </nav>
    </header>
  );
};

export default Header;