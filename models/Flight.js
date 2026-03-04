const mongoose = require ('mongoose');
const { Schema } = mongoose;

const flightSchema = new Schema ({
  flightNumber: String,
  airline: String,
  departureAirport: String,
  arrivalAirport: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number,
  seatsAvailable: Number
});

module.exports = mongoose.model('Flight', flightSchema);
// model name: Flight
// collection : flights