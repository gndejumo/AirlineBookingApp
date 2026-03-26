import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Book Your Next Flight Easily</h1>
        <p>
          Find affordable flights, manage your bookings, and travel with ease.
        </p>
        <div className="hero-buttons">
          <a href="/flights" className="btn-primary">Browse Flights</a>
          <a href="/register" className="btn-secondary">Get Started</a>
        </div>
      </section>
    </div>
  );
}

export default Home;