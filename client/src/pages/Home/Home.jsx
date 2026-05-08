import { useEffect, useRef } from "react";
import "./Home.css";

/* City coords as % of hero dimensions */
const CITIES = [
  { name: "London",    x: 38.5, y: 26 },
  { name: "New York",  x: 17,   y: 32 },
  { name: "Dubai",     x: 52,   y: 38 },
  { name: "Tokyo",     x: 74,   y: 31 },
  { name: "Sydney",    x: 76,   y: 68 },
  { name: "Singapore", x: 69,   y: 50 },
  { name: "Paris",     x: 40,   y: 24 },
  { name: "LA",        x: 10,   y: 36 },
  { name: "Cairo",     x: 48,   y: 40 },
  { name: "Mumbai",    x: 58,   y: 44 },
];

/* Flight route pairs */
const ROUTES = [
  [0, 1], // London → New York
  [0, 2], // London → Dubai
  [1, 8], // New York → Cairo
  [2, 3], // Dubai → Tokyo
  [3, 4], // Tokyo → Sydney
  [3, 5], // Tokyo → Singapore
  [2, 9], // Dubai → Mumbai
  [6, 2], // Paris → Dubai
  [7, 0], // LA → London
  [5, 4], // Singapore → Sydney
  [9, 5], // Mumbai → Singapore
  [1, 6], // New York → Paris
];

function lerp(a, b, t) { return a + (b - a) * t; }

function quadBezier(x0, y0, x1, y1, t) {
  const mx = (x0 + x1) / 2;
  const my = Math.min(y0, y1) - Math.abs(x1 - x0) * 0.3;
  const bx = lerp(lerp(x0, mx, t), lerp(mx, x1, t), t);
  const by = lerp(lerp(y0, my, t), lerp(my, y1, t), t);
  return { x: bx, y: by };
}

export default function Home() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let tick = 0;

    /* Planes: one per route, staggered offsets */
    const planes = ROUTES.map((route, i) => ({
      route,
      t: (i / ROUTES.length),        // progress 0→1
      speed: 0.0012 + Math.random() * 0.0008,
    }));

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function getPos(cityIndex) {
      const c = CITIES[cityIndex];
      return {
        x: (c.x / 100) * canvas.width,
        y: (c.y / 100) * canvas.height,
      };
    }

    function drawArc(x0, y0, x1, y1, progress, alpha) {
      const mx = (x0 + x1) / 2;
      const my = Math.min(y0, y1) - Math.abs(x1 - x0) * 0.28;

      ctx.beginPath();
      ctx.moveTo(x0, y0);

      /* Draw partial arc up to 'progress' */
      const steps = 60;
      const end = Math.floor(progress * steps);
      for (let s = 1; s <= end; s++) {
        const t = s / steps;
        const px = lerp(lerp(x0, mx, t), lerp(mx, x1, t), t);
        const py = lerp(lerp(y0, my, t), lerp(my, y1, t), t);
        ctx.lineTo(px, py);
      }

      ctx.strokeStyle = `rgba(126, 184, 247, ${alpha * 0.35})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawPlane(x, y, x0, y0, x1, y1, t, alpha) {
      /* Angle from previous point */
      const dt = 0.01;
      const t2 = Math.min(t + dt, 1);
      const p1 = quadBezier(x0, y0, x1, y1, t);
      const p2 = quadBezier(x0, y0, x1, y1, t2);
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = "13px sans-serif";
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillStyle = "#7eb8f7";
      ctx.fillText("✈", -7, 5);
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      planes.forEach((plane) => {
        const [i, j] = plane.route;
        const a = getPos(i);
        const b = getPos(j);

        const pos = quadBezier(a.x, a.y, b.x, b.y, plane.t);

        /* Fade in/out at ends */
        const fade = plane.t < 0.12 ? plane.t / 0.12
                   : plane.t > 0.88 ? (1 - plane.t) / 0.12
                   : 1;

        drawArc(a.x, a.y, b.x, b.y, plane.t, fade);
        drawPlane(pos.x, pos.y, a.x, a.y, b.x, b.y, plane.t, fade);

        plane.t += plane.speed;
        if (plane.t > 1) plane.t = 0;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        {/* Background layers */}
        <div className="hero-bg" />
        <div className="hero-map" />
        <div className="hero-overlay" />

        {/* Animated flight paths */}
        <canvas ref={canvasRef} className="hero-flight-paths" />

        {/* City glow dots */}
        {CITIES.map((city) => (
          <div
            key={city.name}
            className="hero-city-dot"
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
          />
        ))}

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
