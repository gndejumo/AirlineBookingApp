import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        {/* Background layers */}
        <div className="hero-bg" />
        <div className="hero-overlay" />

        {/* Faint watermark */}
        <div className="hero-watermark">✈</div>

        <div className="hero-content">
          <p className="hero-eyebrow">Your Journey Starts Here</p>
          <h1 className="hero-title">Book Your Next<br />Flight Easily</h1>
          <p className="hero-sub">
            Find affordable flights, manage your bookings, and travel with ease.
          </p>
          <div className="hero-buttons">
            <a href="/flights" className="btn-primary">Browse Flights</a>
            <a href="/register" className="btn-secondary">Get Started</a>
          </div>
        </div>

        {/* Dashed route line decoration */}
        <div className="hero-route">
          <span className="hero-route-code">ORG</span>
          <div className="hero-route-line">
            <div className="hero-dash" />
            <span className="hero-route-plane">✈</span>
            <div className="hero-dash" />
          </div>
          <span className="hero-route-code">DST</span>
        </div>
      </section>

      {/* Stats row */}
      <div className="home-stats">
        <div className="stat-card">
          <span className="stat-value">200+</span>
          <span className="stat-label">Destinations</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <span className="stat-value">50K+</span>
          <span className="stat-label">Happy Travelers</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <span className="stat-value">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
