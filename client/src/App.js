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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageFlights from "./pages/Admin/ManageFlights";
import BookingOverview from "./pages/Admin/BookingOverview";
import UserManagement from "./pages/Admin/UserManagement";
import Logout from "./pages/Logout/Logout";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
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
            <ProtectedRoute adminOnly = {true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-flights"
          element={
            <ProtectedRoute adminOnly = {true}>
              <ManageFlights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/booking-overview"
          element={
            <ProtectedRoute adminOnly = {true}>
              <BookingOverview/>
            </ProtectedRoute>
          }
        />
        <Route
          path ="/admin/user-management"
          element={
            <ProtectedRoute adminOnly = {true}>
              <UserManagement/>
            </ProtectedRoute>
          }
          />
      </Routes>
    </>
  );
}

export default App;