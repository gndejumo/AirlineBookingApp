const express = require ('express');
const cors = require("cors");
const app = express(); //app express name 
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
require ('dotenv').config(); //import what is on .env file
const mongoose = require('mongoose');


// Routes
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const flightRoutes = require("./routes/flightRoutes")
const adminRoutes = require("./routes/adminRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

app.get('/', (_req, res) => {
    res.send('Welcome from express!')
})
app.use(cors({
  origin: ["https://lesgophairlines.vercel.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
// RATE LIMITER
app.use(rateLimiter);
// BACKEND ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes)
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);


mongoose.connect(process.env.DB_URL).then(() => console.log('DB Connected successfully!')).catch(err => console.log("DB error", err));


const PORT = process.env.PORT || 5000; //access PORT connection from .env 

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})