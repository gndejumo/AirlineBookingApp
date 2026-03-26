import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Flights from "./pages/Flights/Flights";
import FlightDetails from "./pages/FlightDetails/FlightDetails";
import BookFlight from "./pages/BookFlight/BookFlight";
import Profile from "./pages/Profile/Profile";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManageFlights from "./pages/ManageFlights/ManageFlights";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />

        <Route
          path="/book-flight/:id"
          element={
            <ProtectedRoute>
              <BookFlight />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-flights"
          element={
            <ProtectedRoute>
              <ManageFlights />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;